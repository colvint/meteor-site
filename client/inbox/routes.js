Router.route('/admin', {
  controller: 'AdminController',

  template: 'Inbox',
  layoutTemplate: 'AdminLayout',
  name: 'inbox',
  title: 'Inbox',

  data: {
    title: 'Inbox'
  },

  action() {
    this.render();
    this.render('NewThing', { to: 'page-header-right' })
  }
});
