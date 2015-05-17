$$('.addProcessVideo').on('click', function() {
    // var buttons = [{
    //     text: 'From photo library',
    //     onClick: function() {
    // getPhotoProcess();
    //     }
    // }, {
    //     text: 'From Camera',
    //     onClick: function() {
    captureVideoProcess();
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
function captureSuccessProcess(mediaFiles) {

    var i, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        uploadFileProcess(mediaFiles[i]);
    }
}


function captureVideoProcess() {
    // Launch device video recording application,
    navigator.device.capture.captureVideo(captureSuccessProcess, captureError);
}

function uploadFileProcess(mediaFile) {

    myApp.prompt('Giv videon en title', 'Video title', function(value) {

        var options = new FileUploadOptions();

        var params = {};
        params.process = "process";
        params.id = $$('#patientID').val();
        params.videotitle = value;

        options.params = params;
        var ft = new FileTransfer(),
            path = mediaFile.fullPath,
            name = mediaFile.name;
            $$('.loading').show();

        ft.upload(path, connectionVideo, winProcess, fail, options);

    });
}

function winProcess(r) {
            $$('.loading').hide();

    var result = JSON.parse(r.response);
    var processVideo = $("#process-video");
    var videodate = moment().format('DD-MM-YYYY');
    for (var i = 0; i < result.length; i++) {
                var video = result[0];
                var videotitle = result[1];
    }
    processVideo.append('<div class="swiper-slide"><p class="videoTitle">'+videotitle+'</p><p class="sliderDate">'+videodate+'</p><a href="#" class="openVideo"><video><source type="video/mp4" src="' + video + '"></video></a></div>');
    // console.log(r.response);
    // processVideo.append('<div class="swiper-slide"><a href="#" class="openVideo"><video poster="img/poster.jpg"><source type="video/mp4" src="' + r.response + '"></video></a></div>');

}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}
