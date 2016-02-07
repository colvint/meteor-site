Router.route('/', {
  layoutTemplate: function () {
    return 'GeeWebPageLayout';
  },

  template: function () {
    return 'GeeHomepage';
  },

  data: function () {
    var website = Websites.findOne() || {};

    return {
      title: website.title
    };
  }
});
