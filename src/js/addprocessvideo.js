$$('.addProcessVideo').on('click', function() {
    captureVideoProcess();
});

function captureSuccessProcess(mediaFiles) {
    var i, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        uploadFileProcess(mediaFiles[i]);
    }
}


function captureVideoProcess() {
    navigator.device.capture.captureVideo(captureSuccessProcess, captureError);
}

function uploadFileProcess(mediaFile) {

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
        copyBase(mediaFile, value);
    });
}


function copyBase(mediaFile, title) {
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
                                winProcess(url, title);

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

function winProcess(url, title) {
    console.log('winProcess function ' + url);
    var id = $$('#patientID').val();
    var process = "process";
    var videotitle = title;
    $$.post(connectionVideo, {
        "process": process,
        'id': id,
        'videotitle': videotitle,
        'url': url
    }, function(data) {
        console.log(data);

    });

    var processVideo = $("#process-video");
    var videodate = moment().format('LLL');
    
    var countDivs = $('#process-video .swiper-slide').length;
    if (countDivs == 0) {
        var totalDivs = 0;
    } else {
        var totalDivs = countDivs + 1;
    }


    if ($("#process-video .swiper-slide").length == 0) {
        processVideo.empty();
    }
    ProcessVideoArr.push({
        html: '<video controls=""><source type="video/mp4" src="' + url + '"></video>',
        caption: videodate
    });
    processVideo.append('<div class="swiper-slide"><p class="videoTitle">' + title + '</p><p class="sliderDate">' + videodate + '</p><a id="'+totalDivs+'" href="#" class="openVideo openProcessVideo"><video controls=""><source type="video/mp4" src="' + url + '"></video></a></div>');
}

// function fail(error) {
//     alert("An error has occurred: Code = " + error.code);
//     console.log("upload error source " + error.source);
//     console.log("upload error target " + error.target);
// }
