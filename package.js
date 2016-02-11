Package.describe({
  name: 'meteor-site',
  version: '0.0.3',
  summary: '',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1');
  api.use('ecmascript');

  api.use([
    'matb33:collection-hooks@0.7.14',
    'aldeed:collection2@2.5.0',
    'dburles:collection-helpers@1.0.3',
    'tauruscolvin:meteor-react-bootstrap',
    'iron:router',
    'accounts-base',
    'edgee:slingshot@0.7.1',
    'nilsdannemann:pdfmake@0.1.20',
    'vsivsi:job-collection@1.3.0',
  ]);

  api.imply('vsivsi:job-collection');

  api.use([
    'jquery',
    'tracker',
    'templating',
    'less',
    'tauruscolvin:collection-manager',
  ], 'client');

  api.addFiles([
    'lib/models/users.js',
    'lib/models/organizations.js',
    'lib/models/inbox-messages.js',
    'lib/models/notifications.js',
    'lib/models/websites.js',
    'lib/models/job-queue.js',
    'lib/meteor-site.js',
    'lib/slingshot.js',
  ]);

  api.addFiles([
    'server/interfaces/users.js',
    'server/interfaces/organizations.js',
    'server/interfaces/inbox-messages.js',
    'server/interfaces/websites.js',
  ], 'server');

  api.addFiles([
    'client/lib/subscriptions.js',
    'client/lib/nav.jsx',
    'client/lib/components/current-organization-selector.jsx',
    'client/lib/components/mini-inbox.jsx',
    'client/lib/components/mini-notifier.jsx',
    'client/lib/components/mini-queue.jsx',
    'client/lib/components/summary-panel.jsx',
    'client/head.html',
    'client/lib/slingshot.js',
  ], 'client');

  api.addFiles([
    'client/compatibility/holder.js',
    'client/compatibility/metisMenu.js',
    'client/compatibility/sb-admin-2.js',
  ], 'client', {bare: true});

  api.addFiles([
    'client/shared/helpers.js',
    'client/shared/access-denied.html',
    'client/shared/admin-layout.html',
    'client/shared/error-layout.html',
    'client/shared/loading.html',
    'client/shared/login-buttons.html',
    'client/shared/not-found.html',
    'client/shared/top-nav.html',
  ], 'client');

  api.addFiles([
    'client/admin/routes.js',
    'client/admin/side-nav.jsx',
    'client/admin/layout.html',
    'client/admin/dashboard/routes.js',
    'client/admin/dashboard/template.html',
    'client/admin/organizations/routes.js',
    'client/admin/organizations/settings.jsx',
    'client/admin/organizations/settings.html',
    'client/admin/organizations/members.html',
    'client/admin/organizations/membership-manager.jsx',
  ], 'client');

  api.addFiles([
    'client/website/router.js',
    'client/website/layout.html',
    'client/website/home-page.html',
  ], 'client');

  api.addFiles([
    'client/stylesheets/mixins.less',
    'client/stylesheets/variables.less',
    'client/stylesheets/sb-admin-2.less',
    'client/stylesheets/app.less',
  ], 'client');

  api.addFiles([
    'client/stylesheets/metisMenu.css',
    'client/stylesheets/timeline.css',
  ], 'client', {bare: true});

  api.export([
    'MeteorSite',
    'Organizations',
    'InboxMessages',
    'AdminController',
    'SummaryPanel',
    'Websites',
    'TinyMCEUpload',
    'MeteorSiteJobQueue',
  ]);
});
