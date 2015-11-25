Template.registerHelper('currentOrganizationName', function () {
  if (Meteor.user() && Meteor.user().currentOrganization()) {
    return Meteor.user().currentOrganization().name;
  } else {
    return '';
  }
});
