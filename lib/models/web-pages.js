WebPages = new Meteor.Collection('web-pages');

WebPageRegion = new SimpleSchema({
  name: {
    type: String,
  },

  content: {
    type: String,
  }
});

WebPages.attachSchema(new SimpleSchema({
  organizationId: {
    type: String,
    denyUpdate: true,
    autoValue() {
      if (!this.isUpdate && !this.isSet){
        return Meteor.user().currentOrganizationId;
      }
    },
  },

  websiteId: {
    type: String,
    denyUpdate: true,
  },

  title: {
    label: 'title',
    type: String,
    allowEdit: true,
    allowFilter: true,
  },

  path: {
    label: 'path',
    type: String,
    allowEdit: true,
  },

  layout: {
    label: 'layout',
    type: String,
    allowEdit: true,
    allowFilter: true,
    allowedValues: [ // TODO: theme provides these...
      'home',
      'default',
    ]
  },

  parentPage: {
    label: 'parent page',
    type: String,
    allowEdit: true,
    displayAs: new Relation(WebPages),
    optional: true,
  },

  regions: {
    type: [WebPageRegion],
    optional: true,
  },

  noIndex: {
    type: Boolean,
    label: 'no index',
    allowEdit: true,
    defaultValue: false,
  },

  renderedContent: {
    type: String,
    optional: true,
  },
}));

WebPages.helpers({
  label() {
    return this.title;
  },

  website() {
    return Websites.findOne(this.websiteId);
  },

  contentForRegion(regionName) {
    var region = _.findWhere(this.regions, {name: regionName}) || {};

    return region.content;
  },

  updateRegion(regionName, event) {
    var content = event.target.getContent();

    WebPages.update(this._id, {$pull: {regions: {name: regionName}}});
    WebPages.update(this._id, {$push: {regions: {name: regionName, content: content}}});
  },
});
