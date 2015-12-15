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

    if (userIsAdmin) {
      this.next();
    } else {
      this.render('AccessDenied');
      this.layout('ErrorLayout');
    }
  }
});
