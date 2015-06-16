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

        copyBase(mediaFile, value);
    });
}


function copyBase(mediaFile, title) {
    // console.log('Mediafile copybase ' + mediaFile.fullPath);
    var DocPath = cordova.file.documentsDirectory;
    var d = $.now();
    var newName = d + " "+title+".mov";
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
    var processVideo = $("#process-video");
    var id = $$('#patientID').val();
    if ($("#process-video .swiper-slide").length == 0) {
        processVideo.empty();
    }
    var videodate = moment().format('DD-MM-YYYY, H:mm');
    var countDivs = $('#process-video .swiper-slide').length;
    if (countDivs == 0) {
        var totalDivs = 0;
    } else {
        var totalDivs = countDivs;
    }
    var processvideosDivs = $('.openProcessVideo');
    var processvideosDelete = $('#process-video .deleteContent');


    $.each(processvideosDivs, function() {
        var id = this.id;
        var oldId = parseInt(id);
        $(this).attr('id',oldId+1);
    });
    $.each(processvideosDelete, function() {
        var id = $(this).attr('data-index');
        var oldId = parseInt(id);
        $(this).attr('data-index', oldId + 1);
    });
    ProcessVideoArr.unshift({
        html: '<video controls=""><source type="video/mp4" src="' + url + '"></video>',
        caption: videodate
    });
    
    var process = "process";
    var videotitle = title;
    var table = "processvideo";
    $$.post(connectionVideo, {
        "process": process,
        'id': id,
        'videotitle': videotitle,
        'url': url,
        'date':videodate
    }, function(data) {
        console.log(data);
        var result = JSON.parse(data);

    mySwiper2.prependSlide('<div class="swiper-slide"><a data-array="ProcessVideoArr" data-index="0" data-id="' + table + '" id="' + result + '" class="deleteContent">X</a><h3 class="videoTitle">' + title + '</h3><p class="sliderDate">' + videodate + '</p><a id="0" href="#" class="openVideo openProcessVideo"><video controls=""><source type="video/mp4" src="' + url + '"></video></a></div>');

    });

    var dots = processVideo.siblings()[0];
    $$(dots).show();
    mySwiper2.slideTo(0);
}
