ReactMeteor.createClass({
  displayName: 'MiniNotifier',
  templateName: 'MiniNotifier',

  render() {
    return (
      <li className="dropdown">
        <a className="dropdown-toggle" data-toggle="dropdown" href="#">
          <i className="fa fa-bell fa-fw"></i>  <i className="fa fa-caret-down"></i>
        </a>
        <ul className="dropdown-menu dropdown-alerts">
          <li>
            <a href="#">
              <div>
                <i className="fa fa-comment fa-fw"></i> New Comment
                <span className="pull-right text-muted small">4 minutes ago</span>
              </div>
            </a>
          </li>
          <li className="divider"></li>
          <li>
            <a href="#">
              <div>
                <i className="fa fa-twitter fa-fw"></i> 3 New Followers
                <span className="pull-right text-muted small">12 minutes ago</span>
              </div>
            </a>
          </li>
          <li className="divider"></li>
          <li>
            <a href="#">
              <div>
                <i className="fa fa-envelope fa-fw"></i> Message Sent
                <span className="pull-right text-muted small">4 minutes ago</span>
              </div>
            </a>
          </li>
          <li className="divider"></li>
          <li>
            <a href="#">
              <div>
                <i className="fa fa-tasks fa-fw"></i> New Task
                <span className="pull-right text-muted small">4 minutes ago</span>
              </div>
            </a>
          </li>
          <li className="divider"></li>
          <li>
            <a href="#">
              <div>
                <i className="fa fa-upload fa-fw"></i> Server Rebooted
                <span className="pull-right text-muted small">4 minutes ago</span>
              </div>
            </a>
          </li>
          <li className="divider"></li>
          <li>
            <a className="text-center" href="#">
              <strong>See All Alerts </strong>
              <i className="fa fa-angle-right"></i>
            </a>
          </li>
        </ul>
      </li>
    );
  }
});
