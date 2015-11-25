Meteor.publish("unread-messages", function (user) {
  if (user && user._id === this.userId) {
    return InboxMessages.find({
      organizationId: user.currentOrganizationId,
      recipientIds: {$in: [this.userId]},
      unread: true
    }, {limit: 5});
  } else {
    this.ready();
  }
});

InboxMessages.allow({
  insert(userId, doc) {
    return userId === doc.senderId;
  }
});
