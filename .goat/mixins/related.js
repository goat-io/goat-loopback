const to = require("await-to-js").default;
const mongodb = require("mongodb");
const belongsTo = require("./relations/belongsTo");
const hasMany = require("./relations/hasMany");
const searchRelated = require("./search/related");
const _G = require("../../utilities");

const loadRelations = async (ctx, options) => {
  ctx.args.filter.related = Array.isArray(ctx.args.filter.related)
    ? ctx.args.filter.related
    : [ctx.args.filter.related];

  for (reqArgs of ctx.args.filter.related) {
    const modelDefinition = options.models.find(
      model =>
        model.name ===
        (typeof reqArgs === "string" ? reqArgs : reqArgs.relation)
    );

    if (!modelDefinition) {
      throw new Error(`The relation ${model.name} is not defined on the model`);
    }

    if (modelDefinition.type === "belongsTo") {
      await belongsTo({ ctx, options, modelDefinition, reqArgs });
    } else if (modelDefinition.type === "hasMany") {
      await hasMany({ ctx, options, modelDefinition, reqArgs });
    }
  }
};

const getModelForm = modelName => {
  return global.forms.find(f => f.path === modelName);
};

const getFormQueries = (Form, relatedResults) => {
  const relations = _G.findComponents(Form.components, {
    type: "select",
    dataSrc: "resource"
  });

  let query = [];
  relatedResults.forEach(result => {
    const resourcePath = relations.find(
      r => r.data.resource.toString() === result.model.id.toString()
    ).path;

    query.push({
      [`data.${resourcePath}`]: { inq: result.results }
    });

    /*
    result.results.forEach(r => {
      query.push({
        [`data.${resourcePath}`]: r
      });
    });
    */
  });
  return query;
};

module.exports = (Model, options) => {
  Model.afterRemote("*", (ctx, unused, next) => {
    if (!ctx.args || !_G.get(() => ctx.args.filter.related, undefined)) {
      next();
      return;
    }

    loadRelations(ctx, options)
      .then(() => {
        next();
      })
      .catch(e => {
        console.log("Error", e);
        throw new Error("Error", e);
      });
  });

  Model.beforeRemote("*", async (ctx, unused, next) => {
    const searchString = _G.get(
      () => ctx.args.filter.where["$text"],
      undefined
    );

    const relatedModels = _G.get(() => ctx.args.filter.related, undefined);

    if (!searchString || !relatedModels || relatedModels.length < 1) {
      return;
    }

    const modelName = ctx.methodString.split(".")[0];
    const modelForm = getModelForm(modelName);

    const [error, relatedSearch] = await to(
      searchRelated(relatedModels, searchString)
    );

    if (error) {
      next(error, null);
    }

    const searchQueryResults = await Model.find({
      where: ctx.args.filter.where,
      fields: {
        id: true
      }
    });

    const queries = getFormQueries(modelForm, relatedSearch);
    queries.push({ id: { inq: searchQueryResults.map(r => r.id) } });

    ctx.args.filter.where = { or: [queries[0]] };
  });

  Model.once("attached", async app => {
    Model.getBelongsTo = async (id, request) => {
      const submission = await Model.find({
        where: { id: new mongodb.ObjectID(id) }
      });
      const relatedModelName = request.url.split("/").slice(-1)[0];
      const relatedOptions = options.models.find(
        m => m.name === relatedModelName
      );
      const relatedId = _G.getFromPath(submission[0], relatedOptions.foreignKey)
        .value;
      const relatedSubmission = await app.models.Submission.find({
        where: { id: new mongodb.ObjectID(relatedId) }
      });
      return relatedSubmission;
    };

    Model.getHasMany = async (id, filter, request) => {
      let relatedModelName = request.url.split("/").slice(-1)[0];
      relatedModelName = relatedModelName.split("?")[0];
      const relatedOptions = options.models.find(
        m => m.name === relatedModelName
      );

      let Filter = filter && filter !== "" ? filter : '{ "limit": 10 }';
      try {
        Filter = JSON.parse(Filter);
      } catch (error) {
        _G.error(
          error,
          "Could not parse the Filter. Make sure is a valid JSON"
        );
      }

      if (!Filter.where) {
        Filter.where = {};
      }
      if (!Filter.limit) {
        Filter.limit = 10;
      }

      Filter.where = {
        and: [{ [relatedOptions.foreignKey]: id }, Filter.where]
      };
      const relatedSubmission = await app.models[relatedModelName].find(Filter);
      return relatedSubmission;
    };

    Model.getHasManyCount = async (id, filter, request) => {
      let relatedModelName = request.url.split("/").slice(-2)[0];
      relatedModelName = relatedModelName.split("?")[0];
      const relatedOptions = options.models.find(
        m => m.name === relatedModelName
      );

      let Filter = filter && filter !== "" ? filter : "{}";
      try {
        Filter = JSON.parse(Filter);
      } catch (error) {
        _G.error(
          error,
          "Could not parse the Filter. Make sure is a valid JSON"
        );
      }

      if (!Filter.where) {
        Filter.where = {};
      }

      Filter.where = {
        and: [{ [relatedOptions.foreignKey]: id }, Filter.where]
      };
      const relatedSubmission = await app.models[relatedModelName].count(
        Filter.where
      );
      return relatedSubmission;
    };
  });

  // Generate the related GET routes
  if (Array.isArray(options.models)) {
    options.models.forEach(relation => {
      if (relation.type === "belongsTo") {
        Model.remoteMethod("getBelongsTo", {
          accepts: [
            { arg: "id", type: "string", required: true },
            { arg: "req", type: "object", http: { source: "req" } }
          ],
          description: `[[BelongsTo]] Gets the related ${relation.name} for an instance of the Model ${Model.modelName}`,
          returns: { root: true, type: "array" },
          http: { verb: "get", path: `/:id/${relation.name}` }
        });
      } else if (relation.type === "hasMany") {
        Model.remoteMethod("getHasMany", {
          accepts: [
            { arg: "id", type: "string", required: true },
            { arg: "filter", type: "string", required: false },
            { arg: "req", type: "object", http: { source: "req" } }
          ],
          description: `[[HasMany]] Gets the related ${relation.name} for an instance of the Model ${Model.modelName}`,
          returns: { root: true, type: "array" },
          http: { verb: "get", path: `/:id/${relation.name}` }
        });

        Model.remoteMethod("getHasManyCount", {
          accepts: [
            { arg: "id", type: "string", required: true },
            { arg: "where", type: "string", required: false },
            { arg: "req", type: "object", http: { source: "req" } }
          ],
          description: `[[HasMany]] Gets the number of related ${relation.name} for an instance of the Model ${Model.modelName}`,
          returns: { arg: "count", type: "number" },
          http: { verb: "get", path: `/:id/${relation.name}/count` }
        });
      }
    });
  }
};
