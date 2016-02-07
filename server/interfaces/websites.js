Meteor.publish("websites", function () {
  var host = this.connection.httpHeaders.host,
      websites = Websites.find({hosts: host});

  if (websites) {
    return websites;
  } else {
    return this.ready();
  }
});
