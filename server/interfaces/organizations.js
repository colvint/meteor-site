Organizations.allow({
  insert(userId, doc) {
    return (userId === doc.ownerId);
  },

  update(userId, doc) {
    return (userId === doc.ownerId);
  }
});

Meteor.methods({
  'organizations/inviteMember'(email, organizationId) {
    var user = Accounts.findUserByEmail(email), invitedUserId,
        organization = Organizations.findOne(organizationId);

    // potentially sending email below -- so don't block the thread
    this.unblock();

    // enforce that only the org owner can invite a member
    if (this.userId !== organization.ownerId)
      throw new Meteor.Error('organizations-membership',
        "Only the organization owner can invite a member.");

    // create the user if she doesn't exist
    // user is created w/o a password an cannot login until they set one
    if (!user) {
      invitedUserId = Accounts.createUser({email: email});
      user = Meteor.users.findOne(invitedUserId);
      Accounts.sendEnrollmentEmail(invitedUserId);
    } else {
      invitedUserId = user._id;
    }

    // enforce not inviting an existing member w/o leaking information regarding membership
    if (user && (_.contains(user.organizationIds, organizationId) || _.contains(organization.invitationIds, user._id)))
      throw new Meteor.Error('organizations-membership',
        "Member has already been invited.");

    Organizations.update(organizationId, {
      $push: {invitationIds: invitedUserId}
    });

    Meteor.users.update(invitedUserId, {
      $push: {invitationIds: organizationId}
    });
  },

  'organizations/addMember'(newMemberId, organizationId) {
    var newMember = Meteor.users.findOne(newMemberId),
        organization = Organizations.findOne(organizationId),
        newMemberModifier;

    if (this.userId !== organization.ownerId && this.userId !== newMemberId)
      throw new Meteor.Error('organizations-membership',
        "Only the organization owner or the member can add a member.");

    if (_.contains(newMember.organizationIds, organizationId))
      throw new Meteor.Error('organizations-membership',
        "Unable to add member.");

    if (this.invitationOnly)
      throw new Meteor.Error('organizations-membership',
        "This organization is invitation only.");

    Organizations.update(organizationId, {
      $push: {memberIds: newMemberId},
      $pullAll: {invitationIds: [organizationId]}
    });

    newMemberModifier = {
      $push: {organizationIds: organizationId},
      $pullAll: {invitationIds: [organizationId]},
    }

    if (!newMember.currentOrganizationId) {
      newMemberModifier['$set'] = {
        currentOrganizationId: organizationId,
      }
    }

    Meteor.users.update(newMemberId, newMemberModifier);
  },

  'organizations/removeMember'(memberId, organizationId) {
    var organization = Organizations.findOne(organizationId);

    if (this.userId !== organization.ownerId && this.userId !== memberId)
      throw new Meteor.Error('organizations-membership',
        "Only the organization owner or the member can remove a member.");

    if (!_.contains(organization.memberIds, memberId))
      throw new Meteor.Error('organizations-membership',
        "Cannot remove -- user is not a member.");

    Organizations.update(organizationId, {
      $pullAll: {memberIds: [memberId]}
    });

    Meteor.users.update(memberId, {
      $pullAll: {organizationIds: [organizationId]},
      $set: {currentOrganizationId: null},
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
