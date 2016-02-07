Websites = new Meteor.Collection("websites");

Websites.attachSchema(new SimpleSchema({
  organizationId: {
    type: String,
    denyUpdate: true,
    autoValue() {
      if (!this.isUpdate && !this.isSet){
        return Meteor.user().currentOrganizationId;
      }
    },
  },

  title: {
    type: String,
    allowEdit: true,
    allowFilter: true,
  },

  hosts: {
    type: [String],
    allowEdit: true,
    allowFilter: true,
  },

  theme: {
    type: String,
    allowEdit: true,
    allowFilter: true,
    optional: true,
  },
}));

Websites.helpers({
  label() {
    return this.title;
  },
});
