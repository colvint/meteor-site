SummaryPanel = ReactMeteor.createClass({
  templateName: 'SummaryPanel',
  displayName: 'SummaryPanel',

  render() {
    var header = (
      <div className="row">
        <div className="col-xs-3">
          <i className="fa fa-comments fa-5x"></i>
        </div>
        <div className="col-xs-9 text-right">
          <div className="huge">{this.props.summaryValue}</div>
          <div>{this.props.label}</div>
        </div>
      </div>
    ),
    footer = (
      <a href="#">
        <span className="pull-left">{this.props.linkText}</span>
        <span className="pull-right">
          <i className="fa fa-arrow-circle-right"></i>
        </span>
        <div className="clearfix"></div>
      </a>
    );

    return (
      <ReactBootstrap.Panel
        bsStyle={this.props.bsStyle}
        header={header}
        footer={footer}
        collapsible={true} />
    );
  }
});

SummaryPanel.defaultProps = {
  summaryValue: 0,
  label: 'Label is not set',
  linkText: 'View Details',
  bsStyle: 'primary'
};
