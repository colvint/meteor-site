Meteor.publish("inbox-messages", function () {
  const currentUser = Meteor.users.findOne(this.userId)

  return InboxMessages.find(
    {
      organizationId: currentUser.currentOrganizationId,
      recipientIds: {$in: [currentUser._id]},
    }
  )
})

InboxMessages.allow({
  insert(userId, doc) {
    return userId === doc.senderId;
  }
})
