Router.configure({
  notFoundTemplate: 'NotFound',
  loadingTemplate: 'Loading'
});

AdminController = RouteController.extend({
  layoutTemplate: 'AdminLayout',

  onBeforeAction() {
    if (Meteor.userId()) {
      this.next();
    } else {
      this.render('AccessDenied');
      this.layout('ErrorLayout');
    }
  }
});
