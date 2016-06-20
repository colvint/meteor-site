Router.route('/admin/user/profile', {
  controller: 'AdminController',
  name: 'user.profile',
  parent: 'inbox',
  title: "My Profile",

  data: function () {
    var user = Meteor.user();

    return {
      item: user,
      collection: Meteor.users,
      title: "My Profile",
    };
  },

  action() {
    this.render('ProfileEditor');
    this.render('CurrentOrganizationSelector', {
      to: 'page-header-right'
    });
  }
});
