function removeMember(organizationId) {
  Meteor.call('organizations/removeMember', this._id, organizationId);
}

InviteNewMemberModal = ReactMeteor.createClass({
  displayName: 'InviteNewMemberModal',

  mixins: [ReactLinkedStateMixin],

  getInitialState() {
    return {}
  },

  inviteMember() {
    Meteor.call('organizations/inviteMember',
      this.state.email, this.props.item._id);

    this.replaceState({});
    this.props.onHide();
  },

  render () {
    return (
      <ReactBootstrap.Modal
        show={this.props.show}
        onHide={this.props.onHide}>
        <ReactBootstrap.Modal.Header closeButton>
          <ReactBootstrap.Modal.Title>
            Invite New Member
          </ReactBootstrap.Modal.Title>
        </ReactBootstrap.Modal.Header>
        <ReactBootstrap.Modal.Body>
          <label className='control-label'>Email</label>
          <ReactBootstrap.Input
            type="email"
            valueLink={this.linkState('email')} />
          <ReactBootstrap.Button
            onClick={this.inviteMember}
            disabled={!SimpleSchema.RegEx.Email.test(this.state.email)}
            bsStyle="primary">
            Send Invite
          </ReactBootstrap.Button>
        </ReactBootstrap.Modal.Body>
      </ReactBootstrap.Modal>
    );
  }
});

collectionActions = {
  inviteNewMember: {
    title: "Invite New Member",
    modal: InviteNewMemberModal
  }
};

MembersManager = CollectionManager.compose(Meteor.users, {
  displayName: 'MembersManager',
  allowNew: false,
  allowEdit: false,
  allowManage: false,
  allowImport: false,

  selector: function () {
    return {organizationIds: {$in: [this.item._id]}};
  },

  columns: [
    {cellContent: function (organization) {
      return (
        <ReactBootstrap.Button
          bsStyle='danger'
          bsSize='small'
          onClick={removeMember.bind(this, organization._id)}>
          Remove Member
        </ReactBootstrap.Button>
      );
    }},
  ],
  collectionActions: collectionActions
});

InvitationsManager = CollectionManager.compose(Meteor.users, {
  displayName: 'InvitationsManager',
  allowNew: false,
  allowEdit: false,
  allowManage: false,
  allowImport: false,

  selector: function () {
    return {invitationIds: {$in: [this.item._id]}};
  },
  collectionActions: collectionActions
});

ReactMeteor.createClass({
  displayName: 'OrganizationEditor',
  templateName: 'OrganizationEditor',

  getInitialState() {
    var currentTab = Session.get("current-organization-editor-tab") || "members";

    return {key: currentTab};
  },

  getMeteorState() {
    var subscription = Meteor.subscribe('memberships', this.props.item);

    return {
      isLoading: ! subscription.ready(),
    };
  },

  handleSelect(selectedTab) {
    Session.set("current-organization-editor-tab", selectedTab);
    this.setState({key: selectedTab});
  },

  render() {
    var content;

    if (this.state.isLoading) {
      content = (
        <ReactBootstrap.Alert bsStyle='info'>
          Loading...
        </ReactBootstrap.Alert>
      );
    } else {
      content = (
        <ReactBootstrap.Tabs activeKey={this.state.key}
          onSelect={this.handleSelect}
          animation={false}>
          <ReactBootstrap.Tab eventKey="editor" title="Info">
            <CollectionManager.ItemEditor
              item={this.props.item}
              collection={Organizations} />
          </ReactBootstrap.Tab>
          <ReactBootstrap.Tab eventKey="members" title="Members">
            <MembersManager {...this.props} />
          </ReactBootstrap.Tab>
          <ReactBootstrap.Tab eventKey="invitations" title="Pending Invitations">
            <InvitationsManager {...this.props} />
          </ReactBootstrap.Tab>
        </ReactBootstrap.Tabs>
      );
    }

    return (<div>{content}</div>);
  }
});
