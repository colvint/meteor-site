CurrentMembershipsManager = CollectionManager.compose(Meteor.users, {
  displayName: 'CurrentMembershipsManager',
  selector: function () {
    return {organizationIds: {$in: [Meteor.user().currentOrganizationId]}};
  },
  allowEdit: false,
  allowManage: false
});

InvitationsManager = CollectionManager.compose(Meteor.users, {
  displayName: 'InvitationsManager',
  selector: function () {
    return {invitationIds: {$in: [Meteor.user().currentOrganizationId]}};
  },
  allowEdit: false,
  allowManage: false
});

ReactMeteor.createClass({
  templateName: 'MembershipsManager',

  render() {
    return (
      <ReactBootstrap.Tabs defaultActiveKey={1}>
        <ReactBootstrap.Tab eventKey={1} title='Current Members'>
          <CurrentMembershipsManager />
        </ReactBootstrap.Tab>
        <ReactBootstrap.Tab eventKey={2} title='Invitations'>
          <InvitationsManager />
        </ReactBootstrap.Tab>
      </ReactBootstrap.Tabs>
    );
  }
});
