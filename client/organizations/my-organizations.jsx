function leaveOrganization() {
  Meteor.call('organizations/removeMember', Meteor.userId(), this._id);
}

function joinOrganization() {
  Meteor.call('organizations/addMember', Meteor.userId(), this._id);
}

MyMembershipsManager = CollectionManager.compose(Organizations, {
  displayName: 'MyMembershipsManager',
  allowNew: false,
  allowEdit: false,
  allowManage: false,
  allowImport: false,

  selector: function () {
    return {_id: {$in: Meteor.user().organizationIds}};
  },

  columns: [
    {cellContent: function () {
      return (
        <ReactBootstrap.Button
          bsStyle='danger'
          bsSize='small'
          onClick={leaveOrganization.bind(this)}>
          Leave
        </ReactBootstrap.Button>
      );
    }},
  ]
});

MyOwnershipsManager = CollectionManager.compose(Organizations, {
  displayName: 'MyOwnershipsManager',
  allowImport: false,

  selector: function () {
    return {ownerId: Meteor.userId()};
  },
});

MyInvitationsManager = CollectionManager.compose(Organizations, {
  displayName: 'MyInvitationsManager',
  allowNew: false,
  allowEdit: false,
  allowManage: false,
  allowImport: false,

  selector: function () {
    return {_id: {$in: Meteor.user().invitationIds}};
  },

  columns: [
    {cellContent: function () {
      return (
        <ReactBootstrap.Button bsStyle='info' bsSize='small'
          onClick={joinOrganization.bind(this)}>
          Join
        </ReactBootstrap.Button>
      );
    }},
  ]
});

ReactMeteor.createClass({
  displayName: 'OrganizationsManager',
  templateName: 'OrganizationsManager',

  getInitialState() {
    var currentTab = Session.get("current-organizations-tab") || "memberships";

    return {key: currentTab};
  },

  handleSelect(selectedTab) {
    Session.set("current-organizations-tab", selectedTab);
    this.setState({key: selectedTab});
  },

  render() {
    return (
      <ReactBootstrap.Tabs activeKey={this.state.key}
        onSelect={this.handleSelect}
        animation={false}>
        <ReactBootstrap.Tab eventKey="memberships" title="Memberships">
          <MyMembershipsManager />
        </ReactBootstrap.Tab>
        <ReactBootstrap.Tab eventKey="ownerships" title='Ownerships'>
          <MyOwnershipsManager />
        </ReactBootstrap.Tab>
        <ReactBootstrap.Tab eventKey="invitations" title='Invitations'>
          <MyInvitationsManager />
        </ReactBootstrap.Tab>
      </ReactBootstrap.Tabs>
    );
  }
});
