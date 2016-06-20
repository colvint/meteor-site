var Schema = {}

Meteor.users.attachSchema(new SimpleSchema({
  currentOrganizationId: {
    type: String,
    optional: true,
  },

  username: {
    type: String,
    allowFilter: true,
    optional: true,
  },

  emails: {
    type: Array,
    optional: true,
  },

  "emails.$": {
    type: Object,
  },

  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },

  "emails.$.verified": {
    type: Boolean,
  },

  profile: {
    type: ContactSchema,
  },

  services: {
    type: Object,
    blackbox: true,
    optional: true,
  },

  roles: {
    type: Object,
    blackbox: true,
    optional: true,
  },

  organizationIds: {
    type: [String],
    defaultValue: [],
    optional: true,
  },

  invitationIds: {
    type: [String],
    defaultValue: [],
    optional: true,
  },

  createdAt: {
    type: Date,
    optional: true,
  },
}))

Meteor.users.helpers({
  label() {
    if (this.firstName && this.lastName) {
      return [this.firstName, this.lastName].join(' ')
    } else {
      return this.emails[0].address
    }
  },

  currentOrganization() {
    if (this.currentOrganizationId) {
      return Organizations.findOne(this.currentOrganizationId)
    }
  },

  switchToOrganization(organizationId) {
    Meteor.call('users/switchToOrganization', organizationId)
  }
})

if (Meteor.isClient) {
  Meteor.users.before.update(function (userId, doc, fieldNames, modifier, options) {
    const newEmail = modifier["$set.profile.email"]

    if (newEmail) {
      modifier.$set["emails.0.address"] = newEmail
      modifier.$set["username"] = newEmail
    }
  })
}
