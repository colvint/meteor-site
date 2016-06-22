Jobs = new Meteor.Collection("jobs")

Jobs.attachSchema(new SimpleSchema({
  status: {
    type: String,
    allowedValues: [
      'created',
      'running',
      'failed',
      'errored',
      'completed',
    ],
    defaultValue: 'created',
  },

  statusDetail: {
    type: String,
    optional: true,
  },

  jobType: {
    type: String,
  },

  ownerId: {
    type: String,
  },

  progressPercent: {
    type: Number,
    defaultValue: 0,
  },

  name: {
    type: String,
    optional: true,
  },

  data: {
    type: Object,
    optional: true,
    blackbox: true,
    defaultValue: {},
  },

  resultUrl: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true,
  },

  createdAt: {
    type: Date,
  },

  startedAt: {
    type: Date,
    optional: true,
  },

  completedAt: {
    type: Date,
    optional: true,
  },
}))

Jobs.helpers({
  label() {
    return this.name || this.jobType
  },

  isActive() {
    return this.status !== 'completed'
  },

  owner() {
    return Meteor.users.findOne(this.ownerId)
  },

  timeAgoLabel() {
    return moment(this.completedAt).fromNow()
  },

  durationLabel() {
    return moment(this.createdAt).from(this.completedAt, true)
  },
})

Jobs.before.insert(function (userId, doc) {
  const user = Meteor.user()

  doc.ownerId = userId
  doc.createdAt = new Date
  doc.data.organizationId = user.currentOrganizationId
  doc.data.schoolId = user.currentSchoolId
  doc.data.schoolYear = user.currentSchoolYear
})
