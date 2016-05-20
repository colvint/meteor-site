Meteor.publish('web-pages', function (user) {
  if (user && user.currentOrganizationId) {
    return [
      WebPages.find({organizationId: user.currentOrganizationId}),
    ];
  } else {
    return this.ready();
  }
});

WebPages.allow({
  insert(userId, doc) {
    var user = Meteor.users.findOne(userId);

    return (user && user.currentOrganizationId === doc.organizationId);
  },

  update(userId, doc) {
    var user = Meteor.users.findOne(userId);

    return (user && user.currentOrganizationId === doc.organizationId);
  }
});
