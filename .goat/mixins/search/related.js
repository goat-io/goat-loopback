const to = require("await-to-js").default;
const mongodb = require("mongodb");
const app = require("../../../lb3app/server/server");
const utilities = require("../../../utilities");

const getModel = modelName => {
  return utilities.get(() => app.models[modelName], undefined);
};

const getModelForm = modelName => {
  return global.forms.find(f => f.path === modelName);
};

const getModelResultsIds = async (model, searchQuery) => {
  const results = await model.find({ where: { $text: searchQuery } });
  return results.map(r => r.id.toString());
};

module.exports = async (models, searchQuery) => {
  const relatedSearch = [];
  for (modelName of models) {
    const model = getModel(modelName.relation);
    const form = getModelForm(modelName.relation);
    if (!model) {
      throw new Error(`Model ${modelName.relation} was not found`);
    }
    const [error, searchResultsIds] = await to(
      getModelResultsIds(model, searchQuery)
    );

    if (error) {
      throw new Error(error);
    }
    if (searchResultsIds.length > 0) {
      relatedSearch.push({
        model: {
          name: modelName.relation,
          id: new mongodb.ObjectID(form._id)
        },
        results: searchResultsIds
      });
    }
  }
  return relatedSearch;
};
