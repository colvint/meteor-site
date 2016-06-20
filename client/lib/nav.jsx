MeteorSite.Nav = {
  _navItems: {
    side: [
      {
        title: 'Inbox',
        faClass: 'fa-inbox',
        href: '/admin'
      },
      {
        title: 'My Organizations',
        faClass: 'fa-sitemap',
        href: '/admin/organizations',
      },
      {
        title: 'My Profile',
        faClass: 'fa-user',
        href: '/admin/user/profile',
      },
      {
        title: 'Settings',
        faClass: 'fa-cogs',
        href: '/admin/settings',
        permittedRoles: ['admin']
      },
    ]
  },

  getNavItems(navName) {
    return this._navItems[navName];
  },

  addNavItem(navItem, navName) {
    this._navItems[navName].push(navItem);
  },

  compose(navItems, navName, menuId, options) {
    if (typeof options === 'undefined') options = {};

    var Component = ReactMeteor.createClass({
      templateName: navName,
      displayName: navName,

      componentDidMount() {
        this._metisMenufy();
      },

      componentDidUpdate() {
        this._metisMenufy();
      },

      _metisMenufy() {
        $('#side-menu').metisMenu();
      },

      getMeteorState() {
        return {
          currentUser: (Meteor.user() || {})
        };
      },

      _navItemPermitted(navItem) {
        if (typeof navItem.permittedRoles === 'undefined') return true;

        return _.some(navItem.permittedRoles, (role) => {
          return !_.isEmpty(Roles.getGroupsForUser(this.state.currentUser, role))
        })
      },

      _renderNavItems(navItems) {
        var subMenu, href;

        return _.map(navItems, (navItem, i) => {
          if (!this._navItemPermitted(navItem)) { return; }

          if (navItem.subMenu) {
            href    = '#';
            subMenu = (
              <ul className={classNames('nav')}>
                {this._renderNavItems(navItem.subMenu)}
              </ul>
            );
          } else {
            href    = navItem.href;
            subMenu = null;
          }

          return (
            <li key={i}>
              <a href={href}>
                <span className={classNames('fa', navItem.faClass, 'fa-fw')}></span>
                {_.isFunction(navItem.title) ? navItem.title() : navItem.title}
              </a>
              {subMenu}
            </li>
          );
        });
      },

      render() {
        return (
          <ul className="nav" id={menuId}>
            {this._renderNavItems(navItems)}
          </ul>
        );
      }
    });
  }
};
