TinyMCEUpload = {
  handler: function (blobInfo, success, failure) {
    var uploader = new Slingshot.Upload("tinymce-images");

    debugger;

    uploader.send(blobInfo.blob(), function (error, downloadUrl) {
      if (error) {
        failure(error);
      } else {
        success(downloadUrl);
      }
    });
  }
}
