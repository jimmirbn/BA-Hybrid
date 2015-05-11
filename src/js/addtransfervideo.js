$$('.addTransfersVideo').on('click', function() {
    // var buttons = [{
    //     text: 'From photo library',
    //     onClick: function() {
    // getPhotoPositioning();
    //     }
    // }, {
    //     text: 'From Camera',
    //     onClick: function() {
    captureVideoTransfer();
    //     }
    // }, {
    //     text: 'Cancel',
    //     color: 'red',
    //     onClick: function() {}
    // }, ];
    // myApp.actions(buttons);
});



// Called when capture operation is finished
//
function captureSuccessTransfer(mediaFiles) {
    var i, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        uploadFileTransfer(mediaFiles[i]);
    }
}


function captureVideoTransfer() {
    // Launch device video recording application,
    navigator.device.capture.captureVideo(captureSuccessTransfer, captureError);
}

function uploadFileTransfer(mediaFile) {
    var options = new FileUploadOptions();

    var params = {};
    params.type = "transfer";
    params.id = $('#patientID').val();

    options.params = params;
    var ft = new FileTransfer(),
        path = mediaFile.fullPath,
        name = mediaFile.name;
    ft.upload(path, 'http://www.digitaljimmi.com/uploadvideo.php', winTransfer, fail, options);
}

function winTransfer(r) {
    var transfersVideo = $("#transfers-video");
    transfersVideo.append('<div class="swiper-slide"><a href="#" class="openVideo"><video poster="img/poster.jpg"><source type="video/mp4" src="' + r.response + '"></video></a></div>');
}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}
