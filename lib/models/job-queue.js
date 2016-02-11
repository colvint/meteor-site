MeteorSiteJobQueue = JobCollection('MeteorSiteJobQueue');

if (Meteor.isServer) {
  MeteorSiteJobQueue.allow({
    admin: function (userId, method, params) {
      return (userId ? true : false);
    }
  });

  Meteor.startup(function () {
    Meteor.publish('meteor-site-jobs', function (user) {
      if (user && user.currentOrganizationId) {
        return MeteorSiteJobQueue.find({
          // organizationId: user.currentOrganizationId,
          // userId: user._id
        });
      } else {
        return this.ready();
      }
    });
    
    MeteorSiteJobQueue.startJobServer();
  });
}

if (Meteor.isClient) {
  Meteor.startup(function () {
    Meteor.subscribe('meteor-site-jobs', Meteor.user());
  });

  MeteorSiteJobQueue.startJobServer();
}
