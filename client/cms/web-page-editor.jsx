function updateRegion(regionName, event) {
  var regionContent = event.target.getContent(),
      webpage;

  WebPages.update(this._id, {$pull: {regions: {name: regionName}}});
  WebPages.update(this._id, {$push: {regions: {name: regionName, content: regionContent}}});
  webpage = WebPages.findOne(this._id);

  reRenderPageContent(webpage);
}

function renderRegion(webpage, regionName, isEditor) {
  var content = webpage.contentForRegion(regionName),
      isEditor = typeof(isEditor) === 'undefined' ? false : isEditor;

  if (isEditor) {
    return (
      <ReactTinyMCE
        content={content}
        onSaveContent={updateRegion.bind(webpage, regionName)}
        config={{
          plugins: 'save autolink link image lists print preview',
          toolbar: 'save | undo redo | bold italic | alignleft aligncenter alignright | image',
          inline: true,
          image_list: [
            {title: 'My image 1', value: 'http://www.tinymce.com/my1.gif'},
            {title: 'My image 2', value: 'http://www.moxiecode.com/my2.gif'}
          ]
        }} />
    );
  } else {
    return (<span dangerouslySetInnerHTML={{__html: content}} />);
  }
}

function reRenderPageContent(webpage) {
  var content,
      theme = DefaultTheme,
      Layout = theme.layouts[webpage.layout],
      Wrapper = theme.wrapper;

  content = ReactDOMServer.renderToStaticMarkup((
    <Wrapper webpage={webpage}>
      <Layout webpage={webpage} />
    </Wrapper>
  ));

  WebPages.update(webpage._id, {$set: {renderedContent: content}});
}

function renderLayout(layoutContents, props) {
  if (props.isEditor) {
    return (
      <EditorWrapper {...props}>
        {layoutContents}
      </EditorWrapper>
    );
  } else {
    return layoutContents;
  }
}

EditorTitle = ReactMeteor.createClass({
  getMeteorState() {
    var website = Websites.findOne(this.props.websiteId),
        webpage = WebPages.findOne(this.props.webpageId);

    return {webpage, website};
  },

  render() {
    var title = `${this.state.website.hosts}${this.state.webpage.path}`;

    return (
      <h1 className="page-header">
        {title}
      </h1>
    );
  },
});

EditorWrapper = React.createClass({
  render () {
    return (
      <div>
        <div className="row">
          <div className="col-md-9">
            <EditorTitle {...this.props} />
          </div>
          <div className="col-md-3">
            <h1 className="page-header pull-right">
              <PageSettings {...this.props} />
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div id="website-editor" className="container-fluid">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

HomepageLayout = ReactMeteor.createClass({
  displayName: 'HomepageLayout',
  templateName: 'DefaultHomepageLayout',

  render() {
    var webpage = this.props.webpage,
        layoutContents = (
          <div className="row">
            <div className={classNames('col-xs-12')}>
              <div className="row">
                <div className="col-xs-6">
                  <h1>Homepage Here</h1>
                </div>
                <div className="col-xs-6">
                  <div className="pull-right">
                    <h1><a href="/apply-now">Apply Now</a></h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  {renderRegion(webpage, 'topParagraph', this.props.isEditor)}
                </div>
                <div className="col-xs-12">
                  <img src="http://centralacademy.local:8080/assets/default-theme/images/kitten.jpg" />
                </div>
              </div>
            </div>
          </div>
        );

    return renderLayout(layoutContents, this.props);
  }
});

DefaultLayout = ReactMeteor.createClass({
  displayName: 'DefaultLayout',
  templateName: 'DefaultDefaultLayout',

  render() {
    var layoutContents = (
      <div className="row">
        <div className="col-xs-12">
          {renderRegion(this.props.webpage, 'description', this.props.isEditor)}
        </div>
      </div>
    );

    return renderLayout(layoutContents, this.props);
  }
});

DefaultWrapper = React.createClass({
  render() {
    var webpage = this.props.webpage,
        metaTags = [];

    const stylesheets = [
      'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css',
    ];

    const javascripts = [
      'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js',
      'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js',
    ];

    if (webpage.noIndex) {
      metaTags.push({name: 'robots', content: 'noindex, nofollow'});
    }

    return (
      <html>
        <head>
          <title>{webpage.title}</title>
          {metaTags.map((tag, i) => (
            <meta key={i} name={tag.name} content={tag.content}/>
          ))}
          {stylesheets.map((href, i) => (
            <link key={i} rel="stylesheet" href={href} />
          ))}
        </head>
        <body>
          <div className="container">
            {this.props.children}
          </div>
          {javascripts.map((href, i) => (
            <script key={i} src={href}></script>
          ))}
        </body>
      </html>
    );
  }
});

DefaultTheme = {
  wrapper: DefaultWrapper,
  layouts: {
    home: HomepageLayout,
    default: DefaultLayout,
  },
  templates: {
    home: 'DefaultHomepageLayout',
    default: 'DefaultDefaultLayout',
  }
};
