ShareInboxMessageButton = React.createClass({
  getInitialState() {
    return {
      open: false,
      shareWithUsers: [],
    }
  },

  onShow(evt) {
    evt.stopPropagation()
    this.setState({open: true})
  },

  onHide() {
    this.setState({open: false})
  },

  handleUsersSelected(users) {
    this.setState({shareWithUsers: _.pluck(users, "value")})
  },

  share() {
    this.props.message
  },

  render() {
    const userOptions = MeteorSite.documentsAsOptions(this.props.shareableUsers)

    return (
      <ReactBootstrap.Button onClick={this.onShow} bsStyle="success" className="control btn-circle">
        <i className="fa fa-users"></i>
        <ReactBootstrap.Modal
          show={this.state.open}
          onHide={this.onHide}>
          <ReactBootstrap.Modal.Header closeButton>
            <ReactBootstrap.Modal.Title>
              Share Inbox Message
            </ReactBootstrap.Modal.Title>
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body>
            <div className="form-group">
              <label className="control-label">
                {`Share "${this.props.message.subject}" with these users`}
              </label>
              <ReactSelect
                multi
                options={userOptions}
                value={this.state.shareWithUsers}
                onChange={this.handleUsersSelected} />
            </div>
            <ReactBootstrap.Button
              bsStyle="primary"
              onClick={this.share}
              disabled={_.isEmpty(this.state.shareWithUsers)}>
              Share
            </ReactBootstrap.Button>
          </ReactBootstrap.Modal.Body>
        </ReactBootstrap.Modal>
      </ReactBootstrap.Button>
    )
  }
})

ReactMeteor.createClass({
  displayName: 'Inbox',
  templateName: 'Inbox',

  getMeteorState() {
    const subscription = Meteor.subscribe('memberships', Meteor.user().currentOrganization())
    const shareableUsers = Meteor.users.find({_id: {$nin: [Meteor.userId()]}}).fetch()

    return {
      isLoading: !subscription.ready(),
      messages: InboxMessages.find({}, {limit: 50}).fetch(),
      shareableUsers: shareableUsers,
    }
  },

  openShareModal(evt) {
    evt.preventDefault()
  },

  render() {
    const messages = this.state.messages

    let content

    if (!this.state.loading && messages.length > 0) {
      content = (
        <ReactBootstrap.Accordion>
          {_.map(messages, (message, i) => {
            const header = (
              <span>
                <span className="pull-left subject">
                  <i className="fa fa-file-pdf-o" style={{color: "red"}} />
                  &nbsp;{message.subject}
                </span>
                <span className="pull-right controls">
                  <ShareInboxMessageButton message={message} shareableUsers={this.state.shareableUsers} />
                  <ReactBootstrap.Button className="control btn-circle">
                    <i className="fa fa-check"></i>
                  </ReactBootstrap.Button>
                  <ReactBootstrap.Button bsStyle="danger" className="control btn-circle">
                    <i className="fa fa-times"></i>
                  </ReactBootstrap.Button>
                </span>
                <span className="clearfix"></span>
              </span>
            )
            return (
              <ReactBootstrap.Panel className="inbox-message" key={i} eventKey={message._id} header={header}>
                <span className="body" dangerouslySetInnerHTML={{__html: message.body}} />
              </ReactBootstrap.Panel>
            )
          })}
        </ReactBootstrap.Accordion>
      )
    } else {
      content = (
        <ReactBootstrap.Alert bsStyle="info">
          Whoa! No inbox messages!
        </ReactBootstrap.Alert>
      )
    }

    return content
  }
})
