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

  memberIds: {
    type: [String],
    label: 'members',
    optional: true
  },

  invitationIds: {
    type: [String],
    label: 'invitations',
    optional: true
  }
}));

Organizations.helpers({
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

  inviteMember(userId) {
    Meteor.call('organizations/inviteMember', userId, this._id);
  },

  addMember(userId) {
    Meteor.call('organizations/addMember', userId, this._id);
  },

  removeMember(userId) {
    Meteor.call('organizations/removeMember', userId, this._id);
  },

  memberCount() {
    if (this.memberIds) {
      return this.memberIds.length;
    } else {
      return 0;
    }
  }
});
