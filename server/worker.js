var Resque = Npm.require('node-resque')

var connectionConfig = {
  pkg:       'ioredis',
  host:      '127.0.0.1',
  password:  null,
  port:      6379,
  database:  0,
  namespace: 'meteor-site',
}

var fontDir = `${__meteor_bootstrap__.serverDir}/assets/packages/meteor-site/private/fonts`

var updateJob = Meteor.bindEnvironment(function (resqueJobOrId, modifier) {
  var jobId = resqueJobOrId["args"] ? _.first(resqueJobOrId["args"]) : resqueJobOrId
  var job = Jobs.findOne(jobId)

  Jobs.update(job._id, modifier)
})

var workerTypes = {
  "report-card": {
    perform: Meteor.bindEnvironment(function (jobId, callback) {
      var job = Jobs.findOne(jobId)
      var pdfMakePrinter = Npm.require('pdfmake')
      var AWS = Npm.require('aws-sdk')
      var s3 = new AWS.S3({
        accessKeyId: '01ZW060RHJG4EZ0P2ER2',
        secretAccessKey: 'VApNuFH6AWZgF7YwAsJ2lu9wwVc4NbAer56DdTla',
        params: {Bucket: 'meteor-site'}
      })
      var printer = new pdfMakePrinter({
        Roboto: {
          normal: `${fontDir}/Roboto-Regular.ttf`,
          bold: `${fontDir}/Roboto-Medium.ttf`,
          italics: `${fontDir}/Roboto-Italic.ttf`,
          bolditalics: `${fontDir}/Roboto-Italic.ttf`
        }
      })
      var doc = printer.createPdfKitDocument({
        content: [
        	{text: 'Report Card', bold: true},
        	'this is a report card',
        ]
      })
      var chunks = []
      var remoteFilePath = `report-cards/${jobId}.pdf`

      // generate the pdf
      doc.on('data', function (chunk) {
        chunks.push(chunk)
      })

      doc.on('end', function () {
        s3.upload({
          ACL: 'public-read',
          Key: remoteFilePath,
          Body: Buffer.concat(chunks),
          ContentType: 'application/pdf',
        }, function(err, data) {
          if (err) {
            console.log(err, err.stack)
          } else {
            updateJob(jobId, {$set: {
              resultUrl: `https://meteor-site.s3.amazonaws.com/${remoteFilePath}`,
              progressPercent: 100,
            }})
          }
        })
      })

      doc.end()

      callback(null, true)
    })
  }
}

MeteorSite.Worker = {
  connectionConfig: connectionConfig,
  types: workerTypes,

  start: function () {
    if (process.env.ROLE === 'worker' || process.env.NODE_ENV === 'development') {
      var worker = new Resque.worker({connection: connectionConfig, queues: '*'}, workerTypes)

      worker.connect(function () {
        worker.workerCleanup()
        worker.start()
      })

      worker.on('start', function () {
        console.log("\nWorker started...\n")
      })

      worker.on('job', function (queue, resqueJob) {
        updateJob(resqueJob, {$set: {status: 'running', startedAt: Date.now()}})
      })

      worker.on('success', function (queue, resqueJob, result) {
        updateJob(resqueJob, {$set: {status: 'completed', completedAt: Date.now()}})
      })

      worker.on('failure', function (queue, resqueJob, failure) {
        updateJob(resqueJob, {$set: {status: 'failed', statusDetail: failure, completedAt: Date.now()}})
      })

      worker.on('error', function (queue, resqueJob, error) {
        updateJob(resqueJob, {$set: {status: 'error', statusDetail: error, completedAt: Date.now()}})
      })
    }
  },
}

Meteor.startup(MeteorSite.Worker.start)
