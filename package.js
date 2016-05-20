Package.describe({
  name: 'meteor-site',
  version: '0.0.3',
  summary: '',
  git: '',
  documentation: 'README.md'
});

Npm.depends({
  'node-resque': '2.0.5',
  'pdfmake': '0.1.18',
  'aws-sdk': '2.3.13',
})

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1');
  api.use('ecmascript');

  api.use([
    'matb33:collection-hooks@0.7.14',
    'aldeed:collection2@2.5.0',
    'dburles:collection-helpers@1.0.3',
    'tauruscolvin:meteor-react-bootstrap',
    'tauruscolvin:meteor-site-tinymce',
    'tauruscolvin:relations',
    'iron:router',
    'accounts-base',
    'nilsdannemann:pdfmake@0.1.20',
  ]);

  api.use([
    'jquery',
    'tracker',
    'templating',
    'less',
    'reactive-var',
    'tauruscolvin:collection-manager',
  ], 'client');

  api.addFiles([
    'lib/models/users.js',
    'lib/models/organizations.js',
    'lib/models/inbox-messages.js',
    'lib/models/notifications.js',
    'lib/models/web-pages.js',
    'lib/models/websites.js',
    'lib/models/jobs.js',
    'lib/meteor-site.js',
  ]);

  api.addFiles([
    'server/interfaces/users.js',
    'server/interfaces/organizations.js',
    'server/interfaces/inbox-messages.js',
    'server/interfaces/websites.js',
    'server/interfaces/web-pages.js',
    'server/interfaces/jobs.js',
    'server/worker.js',
  ], 'server');

  api.addFiles([
    'client/lib/subscriptions.js',
    'client/lib/nav.jsx',
    'client/lib/components/login-box.jsx',
    'client/lib/components/current-organization-selector.jsx',
    'client/lib/components/mini-inbox.jsx',
    'client/lib/components/mini-notifier.jsx',
    'client/lib/components/mini-queue.jsx',
    'client/lib/components/summary-panel.jsx',
    'client/head.html',
  ], 'client');

  api.addFiles([
    'client/compatibility/holder.js',
    'client/compatibility/metisMenu.js',
    'client/compatibility/sb-admin-2.js',
  ], 'client', {bare: true});

  api.addFiles([
    'client/shared/helpers.js',
    'client/shared/login.html',
    'client/shared/login.js',
    'client/shared/access-denied.html',
    'client/shared/error-layout.html',
    'client/shared/loading.html',
    'client/shared/not-found.html',
    'client/shared/top-nav.html',
  ], 'client');

  api.addFiles([
    'client/routes.js',
    'client/side-nav.jsx',
    'client/layouts/default.html',
    'client/layouts/site-editor.html',

    // dashboard
    'client/dashboard/routes.js',
    'client/dashboard/template.html',

    // organizations
    'client/organizations/routes.js',
    'client/organizations/settings.jsx',
    'client/organizations/settings.html',
    'client/organizations/template.html',
    'client/organizations/my-organizations.jsx',
    'client/organizations/organization-editor.jsx',

    // cms
    'client/cms/page-settings.jsx',
    'client/cms/pages-nav.jsx',
    'client/cms/component.jsx',
    'client/cms/web-page-editor.jsx',
    'client/cms/template.html',
    'client/cms/routes.js',
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

  api.addAssets([
    'private/fonts/Roboto-Regular.ttf',
    'private/fonts/Roboto-Medium.ttf',
    'private/fonts/Roboto-Italic.ttf',
  ], 'server')

  api.export([
    'MeteorSite',
    'Organizations',
    'InboxMessages',
    'AdminController',
    'SummaryPanel',
    'Websites',
    'WebPages',
    'Jobs',
    'TinyMCEUpload',
  ]);
});
