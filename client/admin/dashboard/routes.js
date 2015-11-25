Router.route('/admin', {
  template: 'Dashboard',
  controller: 'AdminController',
  name: 'dashboard',
  title: 'Dashboard',

  data: {
    title: 'Dashboard'
  },

  action() {
    this.render();
    this.render('CurrentOrganizationSelector', {
      to: 'page-header-right'
    });
  }
});
