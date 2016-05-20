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
    label: 'title',
    type: String,
    allowEdit: true,
    allowFilter: true,
  },

  hosts: {
    label: 'host',
    type: String,
    regEx: SimpleSchema.RegEx.Domain,
    allowEdit: true,
    allowFilter: true,
  },

  theme: {
    label: 'theme',
    type: String,
    allowEdit: true,
    allowFilter: true,
    allowedValues: [
      'default',
    ],
  },
}));

Websites.helpers({
  label() {
    return this.title;
  },

  createPage(attrs) {
    var attrsWithAssociations = _.extend(attrs, {
      organizationId: this.organizationId,
      websiteId: this._id,
    });

    WebPages.insert(attrsWithAssociations);
  },

  pageAtPath(path) {
    return WebPages.findOne({
      websiteId: this._id,
      path: path,
    });
  },
});

Websites.after.insert(function (userId, website) {
  var website = this.transform();

  website.createPage({layout: 'home', path: '/'});
});
