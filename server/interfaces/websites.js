Meteor.publish('websites', function (user) {
  if (user && user.currentOrganizationId) {
    return [
      Websites.find({organizationId: user.currentOrganizationId}),
    ];
  } else {
    return this.ready();
  }
});

Websites.allow({
  insert(userId, doc) {
    var user = Meteor.users.findOne(userId);

    return (user && user.currentOrganizationId === doc.organizationId);
  },

  update(userId, doc) {
    var user = Meteor.users.findOne(userId);

    return (user && user.currentOrganizationId === doc.organizationId);
  }
});
