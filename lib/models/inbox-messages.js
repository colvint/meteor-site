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
    autoValue() {
      if (!this.isUpdate && !this.isSet){
        return Meteor.userId();
      }
    }
  },

  senderName: {
    type: String,
    denyUpdate: true,
    autoValue() {
      if (!this.isUpdate && !this.isSet){
        return Meteor.user().name();
      }
    }
  },

  recipientIds: {
    type: [String]
  },

  unread: {
    type: Boolean,
    defaultValue: true
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
      if (!this.isUpdate && !this.isSet){
        return new Date();
      }
    }
  }
}));
