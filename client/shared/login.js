Template.Login.helpers({
  inMessageOnlyFlow: function () {
    return Accounts._loginButtonsSession.get('inMessageOnlyFlow');
  },

  inChangePasswordFlow: function () {
    return Accounts._loginButtonsSession.get('inChangePasswordFlow');
  },
});
