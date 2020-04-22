const diff = require("deep-diff");
const mongodb = require("mongodb");

module.exports = (() => {
  /**
   *
   * Given two Objects, it calculates the changes
   * between them and generates a changelog.
   *
   * @param {Object} param
   * @param {Object} param.previous previous value
   * @param {Object} param.current current value
   * @param {String} param.author change author
   * @returns {Array} Changelog
   */
  const get = ({ previous, current, author }) => {
    const lhs = { ...previous };
    const rhs = { ...current };
    const timestamp = new Date().toISOString();
    let differences = diff(lhs, rhs);

    if (!differences) {
      return [];
    }
    let _diferrences = [];
    differences.forEach(d => {
      if (
        !d.path.includes("user") &&
        !d.path.includes("_ngram") &&
        !d.path.includes("submit") &&
        !d.path.includes("history")
      ) {
        let c = { ...d, user: author, timestamp };
        c.previous = String(c.lhs);
        c.new = String(d.rhs);
        delete c.rhs;
        delete c.lhs;
        _diferrences.push(c);
      }
    });

    _diferrences = _diferrences.map(d => {
      d.path = d.path.map(String);
      d.item = JSON.stringify(d.item);
      return d;
    });
    return _diferrences;
  };
  /**
   *
   * @param {*} param0
   */
  const prepare = ({ submissions, user, form }) => {
    const histories = [];
    const formattedSubmissions = [];
    const date = new Date().toISOString();

    for (const submission of submissions) {
      const _id = new mongodb.ObjectID();
      const history = [];

      const changes = get({
        previous: {},
        current: submission.data,
        author: user.data.email
      });

      history.push({ changes });
      histories.push({ data: { history, submission: String(_id) } });
      formattedSubmissions.push({
        ...submission,
        ...{
          _id,
          form: new mongodb.ObjectID(form),
          owner: user._id,
          deleted: null,
          created: date,
          modified: date
        }
      });
    }
    return {
      changelogs: histories,
      submissions: formattedSubmissions
    };
  };
  /**
   * Gets the LB App model for Changelog
   */
  const getModel = () => {
    const app = require("../../../lb3app/server/server");
    return app.models.changelogs;
  };

  return Object.freeze({
    getModel,
    prepare,
    get
  });
})();
