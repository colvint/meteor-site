PageSettings = ReactMeteor.createClass({
  displayName: 'PageSettings',
  templateName: 'PageSettings',

  getInitialState() {
    return {
      showModal: false,
    };
  },

  getMeteorState() {
    var webpage = WebPages.findOne(this.props.webpageId);

    return {webpage};
  },

  showModal() {
    this.setState({
      showModal: true,
    })
  },

  closeModal() {
    this.setState({
      showModal: false,
    })
  },

  render() {
    return (
      <span>
        <CollectionManager.EditModal
          show={this.state.showModal}
          onHide={this.closeModal}
          item={this.state.webpage}
          collection={WebPages} />

        <ReactBootstrap.Button
          bsStyle="success"
          onClick={this.showModal}>
          Edit Page Settings
        </ReactBootstrap.Button>
      </span>
    );
  }
});
