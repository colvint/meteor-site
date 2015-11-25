MeteorSite.Nav = {
  _navItems: {
    side: [
      {
        title: 'Dashboard',
        faClass: 'fa-dashboard',
        href: '/admin'
      },
      {
        title: 'Users',
        faClass: 'fa-users',
        href: '/admin/users'
      },
      {
        title: 'Settings',
        faClass: 'fa-cogs',
        href: '/admin/settings'
      }
    ]
  },

  getNavItems(navName) {
    return this._navItems[navName];
  },

  addNavItem(navItem, navName) {
    this._navItems[navName].push(navItem);
  },

  compose(navItems, navName, options) {
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
          currentUser: Meteor.user()
        };
      },

      _navItemPermitted(navItem) {
        if (typeof navItem.permittedRole === 'undefined') return true;

        var user = this.state.currentUser;

        return Roles.userIsInRole(
          user,
          navItem.permittedRole,
          user.currentOrganizationId
        );
      },

      render() {
        return (
          <ul className="nav" id="side-menu">
            {_.map(navItems, (navItem, i) => {
              if (this._navItemPermitted(navItem)) {
                return (
                  <li key={i}>
                    <a href={navItem.href}>
                      <i className={classNames('fa', navItem.faClass, 'fa-fw')}></i> {navItem.title}
                    </a>
                  </li>
                );
              }
            })}
          </ul>
        );
      }
    });
  }
};
