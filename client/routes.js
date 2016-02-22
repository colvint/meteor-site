Router.configure({
  notFoundTemplate: 'NotFound',
  loadingTemplate: 'Loading'
});

AdminController = RouteController.extend({
  layoutTemplate: 'AdminLayout',

  onBeforeAction() {
    var userIsAdmin = Meteor.userId() && Roles.userIsInRole(
      Meteor.userId(), 'admin',
      Meteor.user().currentOrganizationId
    );

    if (Meteor.userId()) {
      this.next();
    } else {
      this.redirect('/login');
    }
  }
});

Router.route('/login', {
  template: 'Login',
  name: 'login',

  action() {
    if (Meteor.userId()) {
      this.redirect('/admin')
    } else {
      this.render();
    }
  }
});
