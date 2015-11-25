MeteorSiteJobs = JobCollection('MeteorSiteJobs');

if (Meteor.isServer) {
  MeteorSiteJobs.allow({
    admin: function (userId, method, params) {
      return (userId ? true : false);
    }
  });

  Meteor.startup(function () {
    Meteor.publish('MeteorSiteJobs', function (user) {
      if (user && user.currentOrganizationId) {
        return MeteorSiteJobs.find({
          // organizationId: user.currentOrganizationId,
          // userId: user._id
        });
      } else {
        return this.ready();
      }
    });

    MeteorSiteJobs.startJobServer();
    Job.processJobs('MeteorSiteJobs', 'buildSchedule', function (job, callback) {
      job.progress();
      job.done();
      callback();
    });
  });
}

if (Meteor.isClient) {
  Meteor.startup(function () {
    Meteor.subscribe('MeteorSiteJobs', Meteor.user());
  });
}
