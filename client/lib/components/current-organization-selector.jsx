var TabLabel = React.createClass({
  render() {
    return (
      <span>
        {this.props.title}
        &nbsp;
        <span className="badge">
          {this.props.count}
        </span>
      </span>
    );
  }
});

var OrganizationList = ReactMeteor.createClass({
  setCurrent(organizationId) {
    Meteor.call('users/switchToOrganization', organizationId);
  },

  becomeMember(organizationId) {
    Meteor.call('organizations/addMember', Meteor.userId(), organizationId);
  },

  leave(organizationId) {
    Meteor.call('organizations/removeMember', Meteor.userId(), organizationId);
  },

  render() {
    var membershipControls, joinBtn, leaveBtn, setCurrentBtn, currentBtn;

    if (this.props.organizations.length === 0) {
      return (
        <ReactBootstrap.Alert bsStyle='info'>
          No organizations
        </ReactBootstrap.Alert>
      );
    } else {
      return (
        <ReactBootstrap.Table
          className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <td style={{width: '400px'}}>Organization</td>
              <td>Members</td>
              <td>Type</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {_.map(this.props.organizations, (organization, i) => {
              if (organization._id === Meteor.user().currentOrganizationId) {
                currentBtn = (
                  <ReactBootstrap.Button bsSize='small' disabled={true}>
                    Current
                  </ReactBootstrap.Button>
                );
              }

              if (organization._id !== Meteor.user().currentOrganizationId && (_.contains(Meteor.user().organizationIds, organization._id) || Meteor.userId() === organization.ownerId)) {
                setCurrentBtn = (
                  <ReactBootstrap.Button bsStyle='success' bsSize='small'
                    onClick={this.setCurrent.bind(this, organization._id)}>
                    Set Current
                  </ReactBootstrap.Button>
                )
              }

              if (_.contains(Meteor.user().invitationIds, organization._id)) {
                joinBtn = (
                  <ReactBootstrap.Button bsStyle='info' bsSize='small'
                    onClick={this.becomeMember.bind(this, organization._id)}>
                    Join
                  </ReactBootstrap.Button>
                );
              }

              if (_.contains(Meteor.user().organizationIds, organization._id)) {
                leaveBtn = (
                  <ReactBootstrap.Button bsStyle='danger' bsSize='small'
                    onClick={this.leave.bind(this, organization._id)}>
                    Leave
                  </ReactBootstrap.Button>
                );
              }

              membershipControls = (
                <ReactBootstrap.ButtonGroup>
                  {currentBtn}
                  {joinBtn}
                  {leaveBtn}
                  {setCurrentBtn}
                </ReactBootstrap.ButtonGroup>
              );

              return (
                <tr key={i}>
                  <td>{organization.name}</td>
                  <td>{organization.memberCount}</td>
                  <td>{organization.typeName}</td>
                  <td>
                    {membershipControls}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </ReactBootstrap.Table>
      );
    }
  }
});

ReactMeteor.createClass({
  templateName: 'CurrentOrganizationSelector',
  displayName: 'CurrentOrganizationSelector',

  getInitialState() {
    return {
      isOpen: false
    }
  },

  getMeteorState() {
    var currentOrganization = Meteor.user().currentOrganization() || {};
        ownerships = Organizations.find({ownerId: Meteor.userId()}),
        memberships = Organizations.find({_id: {$in: Meteor.user().organizationIds}}),
        invitations = Organizations.find({_id: {$in: Meteor.user().invitationIds}});

    return {
      ownerships: ownerships.fetch(),
      memberships: memberships.fetch(),
      invitations: invitations.fetch(),
      currentOrganizationName: currentOrganization.name
    }
  },

  openModal() {
    this.setState({
      isOpen: true
    });
  },

  closeModal() {
    this.setState({
      isOpen: false
    });
  },

  handleTabSelect(tab) {
    this.setState({
      activeTab: tab
    });
  },

  render() {
    var ownershipsTab, membershipsTab, invitationsTab;

    ownershipsTab = (
      <ReactBootstrap.TabPane
        eventKey='ownerships'
        tab={<TabLabel title="Ownerships" count={this.state.ownerships.length}/>}>
        <OrganizationList
          organizations={this.state.ownerships}/>
      </ReactBootstrap.TabPane>
    );

    membershipsTab = (
      <ReactBootstrap.TabPane
        eventKey='memberships'
        tab={<TabLabel title="Memberships" count={this.state.memberships.length}/>}>
        <OrganizationList
          organizations={this.state.memberships}/>
      </ReactBootstrap.TabPane>
    );

    invitationsTab = (
      <ReactBootstrap.TabPane
        eventKey='invitations'
        tab={<TabLabel title="Invitations" count={this.state.invitations.length}/>}>
        <OrganizationList
          organizations={this.state.invitations}/>
      </ReactBootstrap.TabPane>
    );

    return (
      <span className='pull-right'>
        <ReactBootstrap.Button
          bsStyle='success'
          onClick={this.openModal}>
          {this.state.currentOrganizationName || 'Set Current Organization'}
        </ReactBootstrap.Button>

        <ReactBootstrap.Modal
          show={this.state.isOpen}
          onHide={this.closeModal}
          bsSize='large'
          className='current-organization-selector'>
          <ReactBootstrap.Modal.Header closeButton>
            Organizations
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body>
            <ReactBootstrap.TabbedArea
              activeKey={this.state.activeTab}
              onSelect={this.handleTabSelect}
              animation={false}>
              {membershipsTab}
              {ownershipsTab}
              {invitationsTab}
            </ReactBootstrap.TabbedArea>
          </ReactBootstrap.Modal.Body>
          <ReactBootstrap.Modal.Footer>
            <ReactBootstrap.Button onClick={this.closeModal}>
              Done
            </ReactBootstrap.Button>
          </ReactBootstrap.Modal.Footer>
        </ReactBootstrap.Modal>
      </span>
    );
  }
});
