const Auth = require("./repositories/Auth");
module.exports = Model => {
  Model.once("attached", async app => {
    Model.observe("access", async function(ctx) {
      // console.log("ctx.req.headers", ctx);
    });

    Model.beforeRemote("**", async ctx => {
      const shouldSkip = String(process.env.LB_SKIP_JWT).toLowerCase();
      if (shouldSkip === "true") {
        return;
      }

      if (!Auth.user(ctx)) {
        let error = new Error("Session Expired");
        error.status = 440;
        throw error;
      }
      // TODO this should be Model.permissions
      // TODO model.getForm
      const formId = Model.settings.mixins.FormSelection._id;
      const form = global.forms.find(f => String(f._id) === String(formId));
      const submissionAccess = form.submissionAccess;

      let error = new Error("Unauthorized");
      error.status = 401;
      let access = [];
      switch (ctx.req.method) {
        case "GET":
          access = submissionAccess.find(
            a => a.type === "read_all" /*|| a.type === 'read_own'*/
          );
          if (!access) {
            return;
          }
          access.roles = access.roles.map(() => String);

          if (!access.roles.some(r => user.roles.includes(r))) {
            throw error;
          }
          break;
        case "POST":
          access = submissionAccess.find(
            a => a.type === "create_own" /*|| a.type === 'read_own'*/
          );
          if (!access) {
            return;
          }
          access.roles = access.roles.map(() => String);

          if (!access.roles.some(r => user.roles.includes(r))) {
            throw error;
          }
          break;
        case "PUT":
          access = submissionAccess.find(
            a => a.type === "update_all" /*|| a.type === 'read_own'*/
          );
          if (!access) {
            return;
          }
          access.roles = access.roles.map(() => String);

          if (!access.roles.some(r => user.roles.includes(r))) {
            throw error;
          }
          break;
        case "PATCH":
          access = submissionAccess.find(
            a => a.type === "update_all" /*|| a.type === 'read_own'*/
          );
          if (!access) {
            return;
          }
          access.roles = access.roles.map(() => String);

          if (!access.roles.some(r => user.roles.includes(r))) {
            throw error;
          }
          break;
        case "DELETE":
          access = submissionAccess.find(
            a => a.type === "delete_all" /*|| a.type === 'read_own'*/
          );
          if (!access) {
            return;
          }
          access.roles = access.roles.map(() => String);

          if (!access.roles.some(r => user.roles.includes(r))) {
            throw error;
          }
          break;
        default:
          throw error;
          break;
      }
    });
  });
};
