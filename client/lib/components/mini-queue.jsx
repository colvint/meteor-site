ReactMeteor.createClass({
  displayName: 'MiniQueue',
  templateName: 'MiniQueue',

  getMeteorState() {
    return {
      jobs: Jobs.find({status: {$in: ["created", "running"]}}, {limit: 5}).fetch()
    }
  },

  render() {
    return (
      <li className="dropdown">
        <a className="dropdown-toggle" data-toggle="dropdown" href="#">
          <i className="fa fa-tasks fa-fw"></i>  <i className="fa fa-caret-down"></i>
        </a>
        <ul className="dropdown-menu dropdown-tasks">
          {_.map(this.state.jobs, (job, i) => {
            var progressStyle = {width: `${job.progressPercent}%`}

            return (
              <li key={i}>
                <a href={job.resultUrl} target="_blank">
                  <div>
                    <p>
                      <strong>{job.label()}</strong>
                      <span className="pull-right text-muted">
                        {`${job.progressPercent}% Complete`}
                      </span>
                    </p>
                    <div className={classNames('progress', 'progress-striped', {active: job.isActive()})}>
                      <div className="progress-bar progress-bar-info" style={progressStyle}>
                        <span className="sr-only">
                          {`${job.progressPercent}% Complete`}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
                <div className="divider"></div>
              </li>
            )
          })}
          <li>
            <a className="text-center" href="/admin">
              <strong>See All Tasks </strong>
              <i className="fa fa-angle-right"></i>
            </a>
          </li>
        </ul>
      </li>
    )
  }
})
