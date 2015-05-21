// $$('.addTransfersVideo').on('click', function() {
//     captureVideoTransfer();
// });



// // Called when capture operation is finished
// //
// function captureSuccessTransfer(mediaFiles) {
//     var i, len;
//     for (i = 0, len = mediaFiles.length; i < len; i += 1) {
//         uploadFileTransfer(mediaFiles[i]);
//     }
// }

// function captureVideoTransfer() {
//     // Launch device video recording application,
//     navigator.device.capture.captureVideo(captureSuccessTransfer, captureError);
// }

// function uploadFileTransfer(mediaFile) {
//     var options = new FileUploadOptions();
//     myApp.prompt('Giv videon en title', 'Video title', function(value) {

//         var options = new FileUploadOptions();

//         var params = {};
//         params.process = "transfer";
//         params.id = $('#patientID').val();
//         params.videotitle = value;

//         options.params = params;
//         var ft = new FileTransfer(),
//             path = mediaFile.fullPath,
//             name = mediaFile.name;
//             $$('.loading').show();
//         ft.upload(path, connectionVideo, winTransfer, fail, options);
//     });
// }

// function winTransfer(r) {
//     $$('.loading').hide();
//     var result = JSON.parse(r.response);

//     var transfersVideo = $("#transfers-video");

//     var videodate = moment().format('DD-MM-YYYY');
//     for (var i = 0; i < result.length; i++) {
//                 var video = result[0];
//                 var videotitle = result[1];
//     }
//     transfersVideo.append('<div class="swiper-slide"><p class="videoTitle">'+videotitle+'</p><p class="sliderDate">'+videodate+'</p><a href="#" class="openVideo"><video><source type="video/mp4" src="' + video + '"></video></a></div>');


// }
// 
$$('.addTransfersVideo').on('click', function() {
    captureVideoTransfer();
});

function captureSuccessTransfer(mediaFiles) {
    var i, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        uploadFileTransfer(mediaFiles[i]);
    }
}


function captureVideoTransfer() {
    navigator.device.capture.captureVideo(captureSuccessTransfer, captureError);
}

function uploadFileTransfer(mediaFile) {

    myApp.prompt('Giv videon en title', 'Video title', function(value) {
        // console.log('Upload file' + mediaFile.fullPath);

        //     var options = new FileUploadOptions();
        //     options.headers = {
        //         Connection: "close"
        //     };
        //     var params = {};
        //     params.process = "process";
        //     params.id = $$('#patientID').val();
        //     params.videotitle = value;

        //     options.params = params;
        //     var ft = new FileTransfer(),
        //         path = mediaFile.fullPath,
        //         name = mediaFile.name;

        //     $$('.loading').show();

        //     ft.upload(path, connectionVideo, winProcess, fail, options);
        copyBaseTransfer(mediaFile, value);
    });
}


function copyBaseTransfer(url, title) {
    console.log('win function ' + url);
    var id = $$('#patientID').val();
    var transfer = "transfer";
    var videotitle = title;
    $$.post(connectionVideo, {
        "transfer": transfer,
        'id': id,
        'videotitle': videotitle,
        'url': url
    }, function(data) {
        console.log(data);

    });
    var transfersVideo = $("#transfers-video");
    var videodate = moment().format('LLL');


    var countDivs = $('#transfers-video .swiper-slide').length;
    if (countDivs == 0) {
        var totalDivs = 0;
    } else {
        var totalDivs = countDivs + 1;
    }

    if ($("#transfers-video .swiper-slide").length == 0) {
        transfersVideo.empty();
    }
    TransferVideoArr.push({
        html: '<video controls=""><source type="video/mp4" src="' + url + '"></video>',
        caption: videodate
    });
    transfersVideo.append('<div class="swiper-slide"><p class="videoTitle">' + title + '</p><p class="sliderDate">' + videodate + '</p><a id="'+totalDivs+'" href="#" class="openVideo openTransferVideo"><video controls=""><source type="video/mp4" src="' + url + '"></video></a></div>');
}

// function fail(error) {
//     alert("An error has occurred: Code = " + error.code);
//     console.log("upload error source " + error.source);
//     console.log("upload error target " + error.target);
// }


