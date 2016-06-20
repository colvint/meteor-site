// organization-level roles (admin, member) should be managed automatically
// group type (e.g. school group) roles should be managed in the role manager

MeteorSite = {
  organizationRoles: ['admin', 'content-manager'],
  groupTypeRoles: [],

  organizationRoleOptions() {
    return this._asOptions(this.organizationRoles)
  },

  groupTypeRoleOptions() {
    return this._asOptions(this.groupTypeRoles)
  },

  _asOptions(roles) {
    return _.map(roles, (role) => {
      return {value: role, label: role}
    })
  }
}
