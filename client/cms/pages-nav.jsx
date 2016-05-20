function routeFor(webPage, website) {
  return `/admin/websites/${website._id}/webpages/${webPage._id}`;
}

ReactMeteor.createClass({
  templateName: 'PagesNav',

  getInitialState() {
    return {
      showAddWebPageModal: false,
    };
  },

  getMeteorState() {
    var webPages = WebPages.find({websiteId: this.props.websiteId});

    return {webPages}
  },

  openAddWebPageModal() {
    this.setState({
      showAddWebPageModal: true,
    });
  },

  closeAddWebPageModal() {
    this.setState({
      showAddWebPageModal: false,
    });
  },

  render() {
    var website = Websites.findOne(this.props.websiteId) || {},
        websiteNode = (<span className="node">{website.hosts}</span>);

    return (
      <div>
        <div className="website-controls text-center">
          <CollectionManager.EditModal
            show={this.state.showAddWebPageModal}
            onHide={this.closeAddWebPageModal}
            item={{websiteId: this.props.websiteId}}
            collection={WebPages} />
          <ReactBootstrap.Button
            bsStyle="success"
            onClick={this.openAddWebPageModal}>
            Add Web Page
          </ReactBootstrap.Button>
        </div>
        <hr/>
        <ReactTreeview nodeLabel={websiteNode} defaultCollapsed={false}>
          {this.state.webPages.map((webPage, i) => {
            return (
              <div key={i} className="node">
                <span className="fa fa-file-text-o fa-fw"></span>
                <span className="node-label">
                  <a href={routeFor(webPage, website)}>{webPage.title}</a>
                </span>
              </div>
            );
          })}
        </ReactTreeview>
      </div>
    );
  }
});
