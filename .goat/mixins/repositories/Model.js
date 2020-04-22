module.exports = (() => {
  /**
   *
   * Disables unwanted auto-generated routes
   *
   * @param {Object} param
   * @returns {void}
   *
   */
  const disableRoutes = Model => {
    Model.disableRemoteMethodByName("upsert");
    Model.disableRemoteMethodByName("updateAll");
    Model.disableRemoteMethodByName("prototype.updateAttributes");
    Model.disableRemoteMethodByName("createChangeStream");
    Model.disableRemoteMethodByName("replaceOrCreate");
    Model.disableRemoteMethodByName("upsertWithWhere");
    Model.disableRemoteMethodByName("replace");
    Model.disableRemoteMethodByName("replaceById");
  };

  const getForm = Model => {
    const formId = Model.settings.mixins.FormSelection._id;
    return global.forms.find(f => String(f._id) === String(formId));
  };

  return Object.freeze({
    disableRoutes,
    getForm
  });
})();
