InboxMessages = new Meteor.Collection("inbox-messages");

InboxMessages.attachSchema(new SimpleSchema({
  organizationId: {
    type: String,
    denyUpdate: true,
    autoValue() {
      if (!this.isUpdate && !this.isSet){
        return Meteor.user().currentOrganizationId;
      }
    }
  },

  senderId: {
    type: String,
    denyUpdate: true,
    defaultValue: 'system',
  },

  recipientIds: {
    type: [String]
  },

  readByRecipientIds: {
    type: [String],
    defaultValue: [],
    optional: true,
  },

  subject: {
    type: String,
    denyUpdate: true
  },

  body: {
    type: String,
    optional: true,
    denyUpdate: true
  },

  sentAt: {
    type: Date,
    denyUpdate: true,
    autoValue() {
      return new Date
    }
  }
}))

InboxMessages.helpers({
  senderName() {
    if (this.senderId === 'system') {
      return 'system'
    } else {
      return Meteor.users.findOne(this.senderId).label()
    }
  }
})
