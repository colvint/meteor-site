Router.route('/admin', {
  controller: 'AdminController',
  layoutTemplate: 'AdminLayout',
  template: 'Inbox',
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
