const jwt = require("jsonwebtoken");

const getTokenFromHeaders = request => {
  const headers = request.headers;
  const authHeader = headers["authorization"]
    ? headers["authorization"].split(" ")[1]
    : undefined;
  return headers["x-jwt-token"] || authHeader;
};

module.exports = (Model, options) => {
  if (!options.enabled) return;

  try {
    const provider = require(`./providers/${options.provider}`);

    const publish = (ctx, output, eventName) => {
      const path = Model.definition.name;

      const token = jwt.decode(getTokenFromHeaders(ctx.req));
      const requester = token.user._id;
      const owner = output.results.owner;
      const submissionId = output.results._id || output.results.id;

      const channels = [];
      channels.push(path);
      channels.push(`${path}-${submissionId}`);

      if (requester !== owner) channels.push(`${path}-${owner}`);

      provider.publish({
        channels,
        event: eventName,
        payload: output
      });
    };

    Model.afterRemote("create", (ctx, output, next) => {
      const path = Model.definition.name;

      provider.publish({
        channels: [path],
        event: "created",
        payload: output
      });

      next();
    });

    Model.afterRemote("patch", (ctx, output, next) => {
      if (!output.results) return next();
      publish(ctx, output, "updated");
      next();
    });

    Model.afterRemote("put", (ctx, output, next) => {
      if (!output.results) return next();
      publish(ctx, output, "updated");
      next();
    });

    Model.observe("before delete", (ctx, next) => {
      const where = ctx.where.id
        ? ctx.where
        : ctx.where.and.find(e => Object.keys(e).includes("id"));

      Model.findById(where.id, (err, model) => {
        // console.log(Model.app.get('headers'))
        const headers = Model.app.get("headers") || {};
        publish({ req: { headers } }, { results: model }, "delete");
        next();
      });
    });
  } catch (err) {
    if (err.code === "MODULE_NOT_FOUND")
      console.log(`Cannot load provider ${opions.provider}`);
    else throw err;
  }
};
