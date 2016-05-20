Accounts.onCreateUser((options, user) => {
  user.organizationIds = [];
  user.invitationIds = [];
  if (options.profile) user.profile = options.profile;
  if (!user.username) user.username = user.emails[0].address;

  return user;
});

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find(
      {_id: this.userId},
      {
        fields: {
          username: 1,
          emails: 1,
          organizationIds: 1,
          invitationIds: 1,
          currentOrganizationId: 1,
          currentSchoolId: 1,
          currentSchoolYear: 1
        }
      }
    );
  } else {
    this.ready();
  }
});

Meteor.publish("memberships", function (organization) {
  if (this.userId === organization.ownerId) {
    return Meteor.users.find(
      {$or: [
        {organizationIds: {$in: [organization._id]}},
        {invitationIds: {$in: [organization._id]}},
      ]},
      {
        fields: {
          username: 1,
          emails: 1,
          organizationIds: 1,
          invitationIds: 1
        }
      }
    );
  } else {
    return this.ready();
  }
});

Meteor.methods({
  'users/switchToOrganization'(organizationId) {
    if (!this.userId)
      throw new Meteor.Error('not-logged-in',
        "You must be logged in to switch organizations.");

    Meteor.users.update(this.userId, {
      $set: {currentOrganizationId: organizationId}
    });
  }
});
