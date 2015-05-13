$$('.addPositioningVideo').on('click', function() {
    // var buttons = [{
    //     text: 'From photo library',
    //     onClick: function() {
    // getPhotoPositioning();
    //     }
    // }, {
    //     text: 'From Camera',
    //     onClick: function() {
    captureVideoPositioning();
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
function captureSuccessPositioning(mediaFiles) {
    var i, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        uploadFilePositioning(mediaFiles[i]);
    }
}


function captureVideoPositioning() {
    // Launch device video recording application,
    navigator.device.capture.captureVideo(captureSuccessPositioning, captureError);
}

function uploadFilePositioning(mediaFile) {
    // var options = new FileUploadOptions();

    // var params = {};
    // params.positioning = "positioning";
    // params.id = $('#patientID').val();

    // options.params = params;
    // var ft = new FileTransfer(),
    //     path = mediaFile.fullPath,
    //     name = mediaFile.name;
    // ft.upload(path, 'http://169.254.136.152/uploadvideo.php', winPositioning, fail, options);

    myApp.prompt('Giv videon en title', 'Video title', function(value) {

        var options = new FileUploadOptions();

        var params = {};
        params.process = "positioning";
        params.id = $('#patientID').val();
        params.videotitle = value;

        options.params = params;
        var ft = new FileTransfer(),
            path = mediaFile.fullPath,
            name = mediaFile.name;
        ft.upload(path, 'http://169.254.136.152/uploadvideo.php', winPositioning, fail, options);

    });

}

function winPositioning(r) {
    var result = JSON.parse(r.response);

    var positioningVideo = $("#positioning-video");

    var videodate = moment().format('DD-MM-YYYY');
    for (var i = 0; i < result.length; i++) {
                var video = result[0];
                var videotitle = result[1];
    positioningVideo.append('<div class="swiper-slide"><p class="videoTitle">'+videotitle+'</p><p class="sliderDate">'+videodate+'</p><a href="#" class="openVideo"><video poster="img/poster.jpg"><source type="video/mp4" src="' + video + '"></video></a></div>');
    }
}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}
