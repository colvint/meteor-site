SummaryPanel = ReactMeteor.createClass({
  render() {
    return (
      <div className={classNames('panel', this.props.className)}>
        <div className="panel-heading">
          <div className="row">
            <div className="col-xs-3">
              <i className={classNames('fa', this.props.icon, 'fa-5x')}></i>
            </div>
            <div className="col-xs-9 text-right">
              <div className="huge">{this.props.summaryValue}</div>
              <div>{this.props.label}</div>
            </div>
          </div>
        </div>
        <a href="#">
          <div className="panel-footer">
            <span className="pull-left">{this.props.linkText}</span>
            <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
            <div className="clearfix"></div>
          </div>
        </a>
      </div>
    );
  }
});

SummaryPanel.defaultProps = {
  summaryValue: 0,
  label: 'Label is not set',
  linkText: 'View Details',
  className: 'panel-green',
  icon: 'fa-comments'
};
