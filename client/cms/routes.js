Router.route('/admin/cms', {
  controller: 'AdminController',
  template: 'ContentManager',
  title: 'Content Management',
  name: 'admin.cms',
  parent: 'dashboard',

  data: {
    title: 'Content Management'
  },

  action() {
    this.render();
    this.render('CurrentOrganizationSelector', {
      to: 'page-header-right'
    });
  }
});

Router.route('/admin/websites/:websiteId', {
  controller: 'AdminController',
  layoutTemplate: 'SiteEditorLayout',
  name: 'admin.cms.website',
  parent: 'admin.cms',

  title: function () {
    var website = Websites.findOne(this.params.websiteId) || {};

    return website.title;
  },

  data: function () {
    var website = Websites.findOne(this.params.websiteId) || {};

    return {
      title: website.hosts,
      website: website,
      websiteId: this.params.websiteId,
      collection: Websites,
    };
  },

  action() {
    this.render('Website');
    // this.render('PageSettings', {
    //   to: 'page-header-right'
    // });
  }
});

Router.route('/admin/websites/:websiteId/webpages/:webpageId', {
  controller: 'AdminController',
  layoutTemplate: 'SiteEditorLayout',
  name: 'admin.cms.website.webpage',
  parent: 'admin.cms.website',

  title: function () {
    var webpage = WebPages.findOne(this.params.webpageId) || {};

    return webpage.title;
  },

  data: function () {
    var website = Websites.findOne(this.params.websiteId) || {},
        webpage = WebPages.findOne(this.params.webpageId) || {},
        title = `${website.hosts}${webpage.path}`;

    return {
      title: title,
      webpage: webpage,
      isEditor: true,
      websiteId: this.params.websiteId,
      webpageId: this.params.webpageId,
    };
  },

  action() {
    var webpage = WebPages.findOne(this.params.webpageId),
        template = DefaultTheme.templates[webpage.layout];

    this.render(template);

    this.render('PageSettings', {
      to: 'page-header-right'
    });
  }
});
