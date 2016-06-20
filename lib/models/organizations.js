Organizations = new Meteor.Collection("organizations");

Organizations.attachSchema(new SimpleSchema({
  ownerId: {
    type: String,
    denyUpdate: true,
    autoValue() {
      if (!this.isUpdate && !this.isSet){
        return this.userId;
      }
    }
  },

  name: {
    type: String,
    label: 'name',
    allowEdit: true,
    allowFilter: true
  },

  typeName: {
    type: String,
    label: 'type',
    allowedValues: ['SchoolGroup'],
    denyUpdate: true,
    allowEdit: true,
    allowFilter: true
  },

  invitationOnly: {
    type: Boolean,
    label: 'invitation only',
    defaultValue: true,
    allowEdit: true,
    allowFilter: true,
  },

  invitationIds: {
    type: [String],
    label: 'invitations',
    optional: true
  },

  memberIds: {
    type: [String],
    label: 'members',
    optional: true
  },

  formerMemberIds: {
    type: [String],
    label: 'former members',
    optional: true
  },

  host: {
    type: String,
    label: 'host',
    regEx: SimpleSchema.RegEx.Domain,
    optional: true,
    allowEdit: true,
  },
}));

Organizations.helpers({
  label() {
    return this.name;
  },

  type() {
    if(Meteor.isClient) {
      return new window[this.typeName](this);
    } else {
      return new global[this.typeName](this);
    }
  },

  owner() {
    return Meteor.users.findOne(this.ownerId);
  },

  memberCount() {
    if (this.memberIds) {
      return this.memberIds.length;
    } else {
      return 0;
    }
  }
});

if (Meteor.isServer) {
  Organizations.after.insert(function (userId, doc) {
    Roles.addUsersToRoles(doc.ownerId, 'admin', doc._id);
  });
}
