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
  var queue = new Resque.queue({connection: Meteor.settings.Redis})

  queue.connect(function () {
    queue.enqueue(job.jobType, job.jobType, job._id)
    console.log(`Enqueued ${JSON.stringify(job)}`)
  })
})
