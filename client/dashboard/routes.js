Router.route('/admin', {
  controller: 'AdminController',

  template: function () {
    if (Meteor.user() && Meteor.user().currentOrganization()) {
      return Meteor.user().currentOrganization().typeName + 'Dashboard';
    } else {
      return 'Dashboard';
    }
  },
  layoutTemplate: 'AdminLayout',
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
