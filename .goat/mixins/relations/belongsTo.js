const app = require("../../../lb3app/server/server");
const utilities = require("../../../utilities");

const getIdsToEagerLoad = ({ ctx, modelDefinition }) => {
  let eagerLookUp = [];
  let results = !ctx.result.meta ? ctx.result : ctx.result.data;
  results.forEach(r => {
    eagerLookUp.push(utilities.getFromPath(r, modelDefinition.foreignKey));
  });

  return Array.from(new Set(eagerLookUp.map(r => r.value)));
};

const getFilter = ({ ctx, modelDefinition, reqArgs }) => {
  let filter = {};
  if (reqArgs && typeof reqArgs === "object" && reqArgs.filter) {
    filter = reqArgs.filter;
  }

  if (reqArgs.filter && reqArgs.filter.fields) {
    const select = Object.keys(reqArgs.filter.fields);
    if (select.find(e => e.startsWith("data."))) {
      filter.fields = { data: true, ...reqArgs.filter.fields };
    }
  }

  const eagerLoad = {
    [modelDefinition.primaryKey]: {
      inq: getIdsToEagerLoad({ ctx, modelDefinition })
    }
  };

  let and = [eagerLoad];

  if (filter.where) {
    and.push(filter.where);
  }

  filter.where = {
    and
  };

  return filter;
};

const getEagerResults = async ({ ctx, modelDefinition, reqArgs }) => {
  const Models = app.models;
  console.log("modelDefinition.name", modelDefinition.name);
  const eagerResults = await Models[modelDefinition.name].find(
    getFilter({ ctx, modelDefinition, reqArgs })
  );

  return eagerResults.reduce((reducer, current) => {
    reducer[
      utilities.getFromPath(current, modelDefinition.primaryKey).value
    ] = current;
    return reducer;
  }, {});
};

const includeInContext = ({ ctx, modelDefinition, eagerResults }) => {
  let results = !ctx.result.meta ? ctx.result : ctx.result.data;
  results = results.filter(
    r =>
      eagerResults[utilities.getFromPath(r, modelDefinition.foreignKey).value]
  );

  results.map(r => {
    if (!r.related) {
      r.related = {};
    }

    r.related[modelDefinition.name] =
      eagerResults[utilities.getFromPath(r, modelDefinition.foreignKey).value];

    return r;
  });
};
module.exports = async ({ ctx, options, modelDefinition, reqArgs }) => {
  const eagerResults = await getEagerResults({ ctx, modelDefinition, reqArgs });
  includeInContext({ ctx, modelDefinition, eagerResults });
};
