module.exports = (() => {
  /**
   *
   * Given the ID, pulls the user from the DB
   * searching both for Admins or Users
   *
   * @param {string} id
   */
  const getUserById = async (id, app) => {
    const { submission, Users } = app.models;
    let user;

    const admins = await submission.find({ where: { id } });
    const users = await Users.find({
      where: { id }
    });
    if (admins && admins.length > 0) {
      user = admins[0];
    }
    if (users && users.length > 0) {
      user = users[0];
    }
    user.roles = user.roles.map(() => String);
    console.log("user", user);
    return user;
  };

  /**
   *
   * Given the context or the LB options, it extracts the
   * user from the user middleware
   *
   * @param {*} ctx
   *
   */
  const user = ctx => {
    // In case we have the LB context
    if (ctx && ctx.args && ctx.args.options && ctx.args.options.user) {
      return ctx.args.options.user;
    }
    // In case we pass the Options
    if (ctx && ctx.user) {
      return ctx.user;
    }
  };

  return Object.freeze({
    user,
    getUserById
  });
})();
