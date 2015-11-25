var Schema = {};

Schema.UserCountry = new SimpleSchema({
  name: {
    type: String
  },

  code: {
    type: String,
    regEx: /^[A-Z]{2}$/
  }
});

Schema.UserProfile = new SimpleSchema({
  firstName: {
    type: String,
    optional: true
  },

  lastName: {
    type: String,
    optional: true
  },

  birthday: {
    type: Date,
    optional: true
  },

  gender: {
    type: String,
    allowedValues: ['Male', 'Female'],
    optional: true
  },

  organization : {
    type: String,
    optional: true
  },

  website: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true
  },

  bio: {
    type: String,
    optional: true
  },

  country: {
    type: Schema.UserCountry,
    optional: true
  }
});

Schema.User = new SimpleSchema({
  username: {
    type: String,
    optional: true
  },

  emails: {
    type: Array,
    optional: true
  },

  "emails.$": {
    type: Object
  },

  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },

  "emails.$.verified": {
    type: Boolean
  },

  createdAt: {
    type: Date
  },

  profile: {
    type: Schema.UserProfile,
    optional: true
  },

  services: {
    type: Object,
    optional: true,
    blackbox: true
  },

  roles: {
    type: Object,
    optional: true,
    blackbox: true
  },

  organizationIds: {
    type: [String],
    optional: true
  },

  invitationIds: {
    type: [String],
    optional: true
  },

  currentOrganizationId: {
    type: String,
    optional: true
  }
});

Meteor.users.attachSchema(Schema.User);

Meteor.users.helpers({
  name() {
    if (this.firstName || this.lastName) {
      return [this.firstName, this.lastName].join(' ');
    } else if (this.username) {
      return this.username;
    } else {
      return 'Anonymous user';
    }
  },

  currentOrganization() {
    if (this.currentOrganizationId) {
      return Organizations.findOne(this.currentOrganizationId);
    }
  },

  switchToOrganization(organizationId) {
    Meteor.call('users/switchToOrganization', organizationId);
  }
});
