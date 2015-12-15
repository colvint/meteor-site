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

Router.route('/admin/memberships', {
  controller: 'AdminController',
  template: 'OrganizationMembers',
  title: 'Memberships',
  name: 'organization.memberships',
  parent: 'dashboard',

  data: {
    title: 'Memberships'
  },

  action() {
    this.render();
    this.render('CurrentOrganizationSelector', {
      to: 'page-header-right'
    });
  }
});
