WebsitesManager = CollectionManager.compose(Websites, {
  displayName: 'WebsitesManager',
});

ReactMeteor.createClass({
  displayName: 'ContentManagerTabs',
  templateName: 'ContentManagerTabs',

  getInitialState() {
    return {
      key: 'websites',
    };
  },

  handleSelect(key) {
    this.setState({key: key});
  },

  render() {
    return (
      <ReactBootstrap.Tabs
        activeKey={this.state.key}
        onSelect={this.handleSelect}
        animation={false}>
        <ReactBootstrap.Tab eventKey="websites" title="Websites">
          <WebsitesManager />
        </ReactBootstrap.Tab>
      </ReactBootstrap.Tabs>
    );
  }
});
