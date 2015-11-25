Organizations.allow({
  insert(userId, doc) {
    return (userId === doc.ownerId);
  },

  update(userId, doc) {
    return (userId === doc.ownerId);
  }
});

Meteor.methods({
  'organizations/inviteMember'(userId, organizationId) {
    var user = Meteor.users.findOne(userId),
        organization = Organizations.findOne(organizationId);

    if (this.userId !== organization.ownerId)
      throw new Meteor.Error('organizations-membership',
        "Only the organization owner can invite a member.");

    if (_.contains(user.organizationIds, organizationId))
      throw new Meteor.Error('organizations-membership',
        "Unable to invite member.");

    Organizations.update(organizationId, {
      $push: {invitationIds: userId}
    });

    Meteor.users.update(userId, {
      $push: {invitationIds: organizationId}
    });
  },

  'organizations/addMember'(userId, organizationId) {
    var user = Meteor.users.findOne(userId),
        organization = Organizations.findOne(organizationId);

    if (this.userId !== organization.ownerId && this.userId !== userId)
      throw new Meteor.Error('organizations-membership',
        "Only the organization owner or the member can add a member.");

    if (_.contains(user.organizationIds, organizationId))
      throw new Meteor.Error('organizations-membership',
        "Unable to add member.");

    if (this.invitationOnly)
      throw new Meteor.Error('organizations-membership',
        "This organization is invitation only.");

    Organizations.update(organizationId, {
      $push: {memberIds: userId},
      $inc: {memberCount: 1},
      $pullAll: {invitationIds: [organizationId]}
    });

    Meteor.users.update(userId, {
      $push: {organizationIds: organizationId},
      $pullAll: {invitationIds: [organizationId]}
    });
  },

  'organizations/removeMember'(userId, organizationId) {
    var user = Meteor.users.findOne(userId),
        organization = Organizations.findOne(organizationId);

    if (this.userId !== organization.ownerId && this.userId !== userId)
      throw new Meteor.Error('organizations-membership',
        "Only the organization owner or the member can remove a member.");

    if (!_.contains(organization.memberIds, this.userId))
      throw new Meteor.Error('organizations-membership',
        "Unable to remove member.");

    Organizations.update(organizationId, {
      $pullAll: {memberIds: [userId]},
      $inc: {memberCount: -1}
    });
    Meteor.users.update(userId, {
      $pullAll: {organizationIds: [organizationId]}
    });
  }
});

Meteor.publish('my-organizations', function () {
  var currentUser = Meteor.users.findOne(this.userId);
  if(!currentUser) return this.ready();

  return Organizations.find(
    {
      $or: [
        {ownerId: this.userId},
        {_id: {$in: currentUser.organizationIds}},
        {_id: {$in: currentUser.invitationIds}}
      ]
    },
    {
      fields: {memberIds: 0, invitationIds: 0 }
    }
  );
});
