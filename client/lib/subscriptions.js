Tracker.autorun(function () {
  Meteor.subscribe('userData');
  Meteor.subscribe('unread-messages', Meteor.user());
  Meteor.subscribe('my-organizations', Meteor.user());
});
