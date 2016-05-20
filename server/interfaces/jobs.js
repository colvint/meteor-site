Resque = Npm.require('node-resque')

Meteor.publish('jobs', function () {
  if (this.userId) {
    return Jobs.find({ownerId: this.userId})
  } else {
    return this.stop()
  }
})

Jobs.allow({
  insert(userId, doc) {
    return doc.ownerId === userId
  },

  update(userId, doc) {
    return doc.ownerId === userId
  }
})

Jobs.after.insert(function (userId, job) {
  var queue = new Resque.queue({connection: MeteorSite.Worker.connectionConfig},
      MeteorSite.Worker.types)

  queue.connect(function () {
    console.log(`\n\nQueueing a ${job.jobType} job...\n\n`)
    queue.enqueue('reports', job.jobType, job._id)
  })
})
