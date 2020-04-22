"use strict";
const mongodb = require("mongodb");

module.exports = (Model, options) => {
  Model.aggregate = (query, cb) => {
    query = query ? JSON.parse(query) : [{}];
    var mongoCollection = Model.getDataSource().connector.collection(
      "submission"
    );
    let formId = new mongodb.ObjectID(Model.settings.mixins.FormSelection._id);

    // If the query already has a Match instruction
    query = query.map(e => {
      if (e["$match"]) {
        e["$match"] = {
          $and: [{ "_meta.deleted": null }, e["$match"]]
        };
      }
      return e;
    });

    const match = query.find(e => e["$match"]);
    // If there is no match instruction
    if (!match) {
      query.unshift({
        $match: { $and: [{ "_meta.deleted": null }] }
      });
    }

    mongoCollection.aggregate(query).toArray((err, result) => {
      return cb(err, result);
    });
  };

  Model.remoteMethod("aggregate", {
    accepts: [{ arg: "query", type: "string" }],
    returns: { arg: "results", type: "array" },
    http: { verb: "get" }
  });
};
