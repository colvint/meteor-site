Tracker.autorun(function () {
  Meteor.subscribe('userData')
  Meteor.subscribe('inbox-messages')
  Meteor.subscribe('my-organizations', Meteor.user())
  Meteor.subscribe('websites', Meteor.user())
  Meteor.subscribe('web-pages', Meteor.user())
  Meteor.subscribe('jobs', Meteor.user())
});
