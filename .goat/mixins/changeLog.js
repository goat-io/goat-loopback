const Changelog = require("./repositories/ChangeLog");
const to = require("await-to-js").default;
const _G = require("../../utilities");

module.exports = Model => {
  Model.once("attached", async app => {
    Model.observe("after save", async ctx => {
      // This afterhook could be done with a background task (No need to wait for it)
      // We should remove this and put it into a work queue
      const changelog = Changelog.get({
        previous: ctx.options.changelog.currentValue.data,
        current: ctx.options.changelog.newValue.data,
        author: ctx.options.user ? ctx.options.user.data.email : "ANONYMOUS"
      });
      // console.log("changelog", changelog);
    });
  });
};
