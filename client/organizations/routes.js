Router.route('/admin/settings', {
  controller: 'AdminController',
  template: 'OrganizationSettings',
  title: 'Settings',
  name: 'admin.settings',
  parent: 'dashboard',

  data: {
    title: 'Settings'
  },

  action() {
    this.render();
    this.render('CurrentOrganizationSelector', {
      to: 'page-header-right'
    });
  }
});

Router.route('/admin/organizations', {
  controller: 'AdminController',
  title: 'My Organizations',
  name: 'organizations',
  parent: 'dashboard',

  data: {
    title: 'My Organizations'
  },

  action() {
    this.render('Organizations');
    this.render('CurrentOrganizationSelector', {
      to: 'page-header-right'
    });
  }
});

Router.route('/admin/organizations/:organizationId', {
  controller: 'AdminController',
  name: 'organization.edit',
  parent: 'organizations',

  title: function () {
    var organization = Organizations.findOne(this.params.organizationId) || {};

    return organization.label();
  },

  data: function () {
    var organization = Organizations.findOne(this.params.organizationId) || {};

    return {
      item: organization,
      title: organization.name,
    };
  },

  action() {
    this.render('Organization');
    this.render('CurrentOrganizationSelector', {
      to: 'page-header-right'
    });
  }
});
