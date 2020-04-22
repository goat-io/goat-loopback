const pluralize = require("pluralize");
const to = require("await-to-js").default;
const nGram = require("./Ngram");
const model = require("./Model");
const Validate = require("../../../utilities/Validator/Validate");

module.exports = (() => {
  const allowedKeys = [
    "_id",
    "id",
    "data",
    "modified",
    "created",
    "_ngram",
    "deleted",
    "owner",
    "user"
  ];
  const response = ({ error, submissions }) => [error, submissions];
  /**
   *
   * Given a submission or an Array of Submissions
   * It replaces de "id" field for "_id"
   *
   * @param {Array || Object} submissions
   * @returns {Array || Object}
   */
  const replaceIds = submissions => {
    let result = JSON.parse(JSON.stringify(submissions));
    const isArray = Array.isArray(result);
    result = Array.isArray(result) ? result : [result];

    result.forEach(r => {
      if (r._id || r.id) {
        r._id = r._id || r.id;
        delete r.id;
        if (r.data) {
          delete r.data.password;
        }
      }
    });
    return isArray ? result : result[0];
  };
  /**
   *
   * Removes all unwanted fields from
   * the submission object
   *
   * @param {Array || Object} submissions
   *
   */
  const filterValidFields = submissions => {
    let arraySubmissions = Array.isArray(submissions)
      ? submissions
      : [submissions];
    return arraySubmissions.reduce((result, item) => {
      const filtered = Object.keys(item)
        .filter(key => allowedKeys.includes(key))
        .reduce((obj, key) => {
          obj[key] = item[key];
          if (obj[key] === undefined) {
            delete obj[key];
          }

          if (key === "id") {
            obj["_id"] = obj["_id"] || obj["id"];
            delete obj["id"];
          }

          return obj;
        }, {});
      result.push(filtered);
      return result;
    }, []);
  };
  /**
   *
   * Validates submissions' basic structure
   *
   * @param {Array || Object} submissions
   *
   */
  const validateStructure = submissions => {
    if (!Array.isArray(submissions) && typeof submissions.data !== "object") {
      throw new Error(
        "Data must be and Array [{data: {}}, {data: {}}]  or and Object {data: {}}"
      );
    }
    const formattedSub = Array.isArray(submissions)
      ? submissions
      : [submissions];

    try {
      const copy = JSON.parse(JSON.stringify(formattedSub));
      return copy;
    } catch (error) {
      console.log(error);
      console.log(formattedSub);
      throw new Error(
        "Your submission is not properly formatted. Make sure you are sending a JSON string"
      );
    }
  };

  const validate = async (Model, submissions) => {
    const Form = model.getForm(Model);
    try {
      let _submissions = validateStructure(submissions);
      _submissions = filterValidFields(_submissions);
      _submissions = nGram.generateFromSubmissions({
        fullTextFields: Model.settings.mixins.Search.fullText,
        fuzzySearchFields: Model.settings.mixins.Search.nGram,
        submissions: _submissions
      });

      _submissions.form = Form._id;

      const [error, validSumissions] = await to(
        Validate.submission(Form, _submissions)
      );

      if (error) {
        return response({ error });
      }

      return response({ submissions: validSumissions });
    } catch (error) {
      return response({ error });
    }
  };

  const insert = async ({ Model, submissions }) => {
    const collection = pluralize.singular(Model.settings.mongodb.collection);
    const mongoCollection = Model.getDataSource().connector.collection(
      collection
    );
    submissions = Array.isArray(submissions) ? submissions : [submissions];

    const [mongoError, inserted] = await to(
      mongoCollection.insertMany(submissions)
    );

    if (mongoError) {
      throw new Error(mongoError);
    }

    return inserted.ops;
  };

  return Object.freeze({
    replaceIds,
    filterValidFields,
    validateStructure,
    validate,
    insert
  });
})();
