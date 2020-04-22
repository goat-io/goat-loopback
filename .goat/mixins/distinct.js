"use strict";
const mongodb = require("mongodb");
const pluralize = require("pluralize");
const _G = require("../../utilities");

const validateField = field => {
  if (field) {
    return [undefined, field];
  }

  const error = _G.error(
    new Error(" 'field' is mandatory"),
    "Validation error. 'field' is mandatory",
    {
      code: 400
    }
  );
  return [error, field];
};

const validateQuery = query => {
  let parsedQuery = {};
  try {
    parsedQuery = query ? JSON.parse(query) : parsedQuery;
    return [undefined, parsedQuery];
  } catch (parseError) {
    const err = _G.error(
      parseError,
      "Validation error. 'query' is not a valid JSON string",
      {
        code: 400
      }
    );
    return [err, query];
  }
};

module.exports = (Model, options) => {
  Model.once("attached", async app => {
    Model.distinct = (field, query, next) => {
      const collection = Model.settings.mongodb.collection; //pluralize.singular(Model.settings.mongodb.collection);
      const mongoCollection = Model.getDataSource().connector.collection(
        collection
      );
      const _id =
        Model.settings.mixins && Model.settings.mixins.FormSelection._id;
      const [fieldError] = validateField(field);

      if (fieldError) {
        return next(fieldError.httpError);
      }

      let [queryError, parsedQuery] = validateQuery(query);

      if (queryError) {
        return next(queryError.httpError);
      }

      parsedQuery = {
        $and: [{ deleted: { $eq: null } }, parsedQuery]
      };

      /*
      if (_id) {
        parsedQuery["$and"].unshift({
          "_meta.form": new mongodb.ObjectID(_id)
        });
      }
      */

      mongoCollection.distinct(field, parsedQuery, (err, records) => {
        records.sort();
        return next(err, records);
      });
    };

    Model.remoteMethod("distinct", {
      accepts: [
        {
          arg: "field",
          type: "string",
          description:
            "Name of the field to search for unique results. i.e: 'data.name'"
        },
        {
          arg: "query",
          type: "string",
          description: `JSON string with MongoDB query to filter the unique results. i.e: '{"data.name": "Chile"  }'`
        }
      ],
      returns: { type: "array", root: true },
      http: { verb: "get" }
    });
  });
};
