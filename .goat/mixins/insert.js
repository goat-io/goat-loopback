const mongodb = require("mongodb");
const to = require("await-to-js").default;
const _G = require("../../utilities");
const Auth = require("./repositories/Auth");
const nGram = require("./repositories/Ngram");
const model = require("./repositories/Model");
const Changelog = require("./repositories/ChangeLog");
const Submission = require("./repositories/Submission");
const Validate = require("../../utilities/Validator/Validate");

const insertSubmissions = async (Model, Submissions, user) => {
  const mongoCollection = Model.getDataSource().connector.collection(
    Model.options.mongodb.collection
  );

  const { submissions, changelogs } = Changelog.prepare({
    submissions: Submissions,
    user,
    form: Model.settings.mixins.FormSelection._id
  });

  const [error, inserted] = await to(mongoCollection.insertMany(submissions));

  if (error) {
    return Promise.reject(error);
  }

  const Changelogs = Changelog.getModel();

  const [changelogError, changelogsInserted] = await to(
    Changelogs.create(changelogs)
  );

  if (changelogError) {
    return Promise.reject(changelogError);
  }
  return inserted.ops;
};

const updateSubmission = async (Model, submission, changes, user, app) => {
  const mongoCollection = Model.getDataSource().connector.collection(
    "submission"
  );
  const submissionId = new mongodb.ObjectID(submission._id);

  const date = new Date().toISOString();

  const [error, inserted] = await to(
    mongoCollection.updateOne(
      { _id: submissionId },
      {
        $set: {
          modified: date,
          _ngram: submission._ngram,
          data: submission.data
        }
      }
    )
  );

  if (error) {
    return Promise.reject(error);
  }

  if (inserted.result.ok !== 1) {
    return Promise.reject(
      Error("MongoDB error. Could not update the document")
    );
  }
  submission.modified = date;

  if (Model.name === "changelogs") {
    return submission;
  }

  const Changelogs = app.models.changelogs;

  const [errorHist, logs] = await to(
    Changelogs.find({ where: { "data.submission": String(submission._id) } })
  );

  if (errorHist) {
    return Promise.reject("MongoDB error. Could not get changelogs");
  }
  const hasLog = logs && Array.isArray(logs) && logs.length > 0;

  if (hasLog) {
    logs[0].data.history.unshift({ changes });
    const [errorLogUpdated, updated] = await to(
      mongoCollection.updateOne(
        { _id: new mongodb.ObjectID(logs[0].id) },
        { $set: { modified: date, data: logs[0].data } }
      )
    );

    if (errorLogUpdated || updated.result.ok !== 1) {
      return Promise.reject("MongoDB error. Could not update ChangeLog");
    }

    return submission;
  }

  let changeSubmission = {
    data: { history: [{ changes }], submission: String(submission._id) }
  };
  const [changelogCreatedError, changelogCreated] = await to(
    Changelogs.create(changeSubmission)
  );

  if (changelogCreatedError) {
    return Promise.reject("MongoDB error. Could not create ChangeLog");
  }

  return submission;
};

module.exports = (Model, options) => {
  const update = async (id, submissions, request, method) => {
    let submission = validSumissions[0];
    const [findError, oldSubmission] = await to(
      app.models.Submission.find({
        where: { id: new mongodb.ObjectID(id) }
      })
    );

    if (findError || oldSubmission.length === 0) {
      const er = _G.error(
        new Error("Submission was not found"),
        "Submission was not found",
        {
          code: 500
        }
      );
      throw new Error(er.httpError);
    }

    if (method === "patch") {
      submission.data = { ...oldSubmission[0].data, ...submission.data };
    }

    let changes =
      Model.name !== "changelogs"
        ? Changelog.get({
            previous: oldSubmission[0].data,
            current: submission.data,
            author: user.data.email
          })
        : [];

    if (changes.length === 0 && Model.name !== "changelogs") {
      return oldSubmission[0];
    }

    submission = nGram.generateFromSubmissions({
      fullTextFields: Model.settings.mixins.Search.fullText,
      fuzzySearchFields: Model.settings.mixins.Search.nGram,
      submissions: submission
    })[0];

    submission = {
      ...submission,
      ...{
        _id: new mongodb.ObjectID(id),
        form: oldSubmission[0].form,
        owner: oldSubmission[0].owner,
        deleted: oldSubmission[0].deleted,
        created: oldSubmission[0].created
      }
    };

    const [updateError, updatedDocument] = await to(
      updateSubmission(Model, submission, changes, user, app)
    );

    if (updateError) {
      const e = _G.error(
        updateError,
        "MongoDB error. Submission could not be updated",
        {
          code: 500
        }
      );
      throw new Error(e.httpError);
    }

    return updatedDocument;
  };
};
