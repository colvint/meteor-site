ReactMeteor.createClass({
  displayName: 'OrganizationSettingsManager',
  templateName: 'OrganizationSettingsManager',

  getMeteorState() {
    return {
      currentUser: Meteor.user()
    }
  },

  render() {
    var currentOrganization = this.state.currentUser.currentOrganization(),
        settingsComponent;

    switch (currentOrganization && currentOrganization.typeName) {
      case 'SchoolGroup':
        settingsComponent = (<SchoolGroupSettings/>);
        break;
      default:
        settingsComponent = (
          <ReactBootstrap.Alert bsStyle='info'>
            No current organization selected
          </ReactBootstrap.Alert>
        );
    }

    return (
      <ReactBootstrap.Panel>
        {settingsComponent}
      </ReactBootstrap.Panel>
    );
  }
});
