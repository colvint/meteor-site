Router.configure({
  notFoundTemplate: 'NotFound',
  loadingTemplate: 'Loading'
})

AdminController = RouteController.extend({
  layoutTemplate: 'AdminLayout',

  onBeforeAction() {
    if (Meteor.userId()) {
      this.next()
    } else {
      this.redirect('/login')
    }
  }
})

Router.route('/', {
  action() {
    this.redirect('/login')
  }
})

Router.route('/login', {
  name: 'login',

  action() {
    if (Meteor.userId()) {
      this.redirect('/admin')
    } else {
      this.render('Login')
    }
  }
})
