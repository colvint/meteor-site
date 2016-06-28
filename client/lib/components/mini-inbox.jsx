ReactMeteor.createClass({
  displayName: 'MiniInbox',
  templateName: 'MiniInbox',

  getMeteorState() {
    return {
      unreadMessages: InboxMessages.find({readByRecipientIds: {$nin: [Meteor.userId()]}}).fetch()
    }
  },

  render() {
    return (
      <li className="dropdown">
        <a className="dropdown-toggle" data-toggle="dropdown" href="#">
          <i className="fa fa-envelope fa-fw"></i>
          <i className="fa fa-caret-down"></i>
        </a>
        <ul className="dropdown-menu dropdown-messages">
          {_.map(this.state.unreadMessages, (message, i) => {
            return (
              <li key={i} className="inbox-message">
                <a href="#">
                  <div className="text-muted">
                    <em>Sent {moment(message.sentAt).format('llll')}</em>
                  </div>
                  <div><strong>From {message.senderName()}:</strong></div>
                  <div>{String(message.subject).substr(0, 75)} ...</div>
                </a>
              </li>
            )
          })}
          <li>
            <a className="text-center" href="/admin">
              <strong>Read All Messages </strong>
              <i className="fa fa-angle-right"></i>
            </a>
          </li>
        </ul>
      </li>
    )
  }
})
