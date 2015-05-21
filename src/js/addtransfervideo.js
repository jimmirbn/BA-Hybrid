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


// function copyBaseTransfer(url, title) {
//     console.log('win function ' + url);
//     var id = $$('#patientID').val();
//     var transfer = "transfer";
//     var videotitle = title;
//     var videodate = moment().format('DD-MM-YYYY, H:mm');
//     $$.post(connectionVideo, {
//         "transfer": transfer,
//         'id': id,
//         'videotitle': videotitle,
//         'url': url,
//         'date':videodate
//     }, function(data) {
//         console.log(data);

//     });
//     var transfersVideo = $("#transfers-video");


//     var countDivs = $('#transfers-video .swiper-slide').length;
//     if (countDivs == 0) {
//         var totalDivs = 0;
//     } else {
//         var totalDivs = countDivs + 1;
//     }

//     var transfervideosDivs = $('.openTransferVideo');


//     $.each(transfervideosDivs, function() {
//         var id = this.id;
//         var oldId = parseInt(id);
//         $(this).attr('id',oldId+1);
//     });

//     if ($("#transfers-video .swiper-slide").length == 0) {
//         transfersVideo.empty();
//     }
//     var dots = transfersVideo.siblings()[0];
//     $$(dots).show();
//     TransferVideoArr.unshift({
//         html: '<video controls=""><source type="video/mp4" src="' + url + '"></video>',
//         caption: videodate
//     });
//     mySwiper5.prependSlide('<div class="swiper-slide"><h3 class="videoTitle">' + title + '</h3><p class="sliderDate">' + videodate + '</p><a id="0" href="#" class="openVideo openTransferVideo"><video controls=""><source type="video/mp4" src="' + url + '"></video></a></div>');
//     mySwiper5.slideTo(0);
// }

function copyBaseTransfer(mediaFile, title) {
    // console.log('Mediafile copybase ' + mediaFile.fullPath);
    var DocPath = cordova.file.documentsDirectory;
    var d = $.now();
    var newName = d + "movie.mov";
    var fullFile = 'file://' + mediaFile.fullPath;
    window.resolveLocalFileSystemURL(fullFile,
        function(file) {
            console.log('success! file was found ' + file.toURL());
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onSuccess, null);

            function onSuccess(fileSystem) {
                window.resolveLocalFileSystemURL(cordova.file.dataDirectory,
                    function(dir) {
                        console.log("Success! Got a DirectoryEntry " + dir.name);
                        // Do more things with `entry` here

                        var documentsPath = fileSystem.root;
                        // console.log('Filesystem ' + documentsPath.toURL());
                        file.copyTo(dir, newName,
                            function(entry) {
                                console.log('copying was successful ' + entry.toURL())
                                var url = entry.toURL();
                                winTransfer(url, title);

                            },
                            function() {
                                console.log('unsuccessful copying')
                            });
                    },
                    function(error) {
                        console.error("Something bad happened, and we didn't get a DirectoryEntry");
                    });
            }
        },
        function() {
            console.log('failure! file was not found')
        });
};

function winTransfer(url, title) {
    console.log('win function ' + url);
    var id = $$('#patientID').val();
    var transfer = "transfer";
    var videotitle = title;
    var videodate = moment().format('DD-MM-YYYY, H:mm');
    $$.post(connectionVideo, {
        "transfer": transfer,
        'id': id,
        'videotitle': videotitle,
        'url': url,
        'date':videodate
    }, function(data) {
        console.log(data);

    });
    var transfersVideo = $("#transfers-video");


    var countDivs = $('#transfers-video .swiper-slide').length;
    if (countDivs == 0) {
        var totalDivs = 0;
    } else {
        var totalDivs = countDivs + 1;
    }

    var transfervideosDivs = $('.openTransferVideo');


    $.each(transfervideosDivs, function() {
        var id = this.id;
        var oldId = parseInt(id);
        $(this).attr('id',oldId+1);
    });

    if ($("#transfers-video .swiper-slide").length == 0) {
        transfersVideo.empty();
    }
    var dots = transfersVideo.siblings()[0];
    $$(dots).show();
    TransferVideoArr.unshift({
        html: '<video controls=""><source type="video/mp4" src="' + url + '"></video>',
        caption: videodate
    });
    mySwiper5.prependSlide('<div class="swiper-slide"><h3 class="videoTitle">' + title + '</h3><p class="sliderDate">' + videodate + '</p><a id="0" href="#" class="openVideo openTransferVideo"><video controls=""><source type="video/mp4" src="' + url + '"></video></a></div>');
    mySwiper5.slideTo(0);
}

// function fail(error) {
//     alert("An error has occurred: Code = " + error.code);
//     console.log("upload error source " + error.source);
//     console.log("upload error target " + error.target);
// }


