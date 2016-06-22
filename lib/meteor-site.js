// organization-level roles (admin, member) should be managed automatically
// group type (e.g. school group) roles should be managed in the role manager

MeteorSite = {
  organizationRoles: ['admin', 'content-manager'],
  groupTypeRoles: [],

  organizationRoleOptions() {
    return this.asOptions(_.map(this.organizationRoles, role => ({value: role, label: role})))
  },

  groupTypeRoleOptions() {
    return this.asOptions(_.map(this.groupTypeRoles, role => ({value: role, label: role})))
  },

  documentsAsOptions(documents) {
    return _.map(documents, (doc) => ({value: doc._id, label: doc.label()}))
  }
}
