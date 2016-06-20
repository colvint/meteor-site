ReactMeteor.createClass({
  displayName: 'Inbox',
  templateName: 'Inbox',

  getMeteorState() {
    return {
      jobs: Jobs.find({status: {$in: ["completed", "failed", "errored"]}}).fetch()
    }
  },

  render() {
    const inboxItems = _.union(this.state.jobs)
    const iconStyle = {color: "red", marginTop: 10}

    return (
      <ReactBootstrap.ListGroup>
        {_.map(inboxItems, (item, i) => {
          const bsStyle = item.status === "completed" ? null : "danger"

          return (
            <ReactBootstrap.ListGroupItem
              key={i}
              bsStyle={bsStyle}
              header={item.label()}
              href={item.resultUrl}
              target="_blank">
              <i className="fa fa-file-pdf-o fa-3x fa-fw" style={iconStyle}></i>
              <span>{item.statusDetail}</span>
              <span className="text-muted pull-right small">
                <i className="fa fa-clock-o fa-fw"></i>
                <em>{`${item.status} ${item.timeAgoLabel()}`}</em>
              </span>
            </ReactBootstrap.ListGroupItem>
          )
        })}
      </ReactBootstrap.ListGroup>
    )
  }
})
