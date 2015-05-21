$$(document).on('pageInit', '.page[data-page="learning"]', function(e) {
    var learningContent = $('#learningMaterial');

    $$('.addLearningImage').on('click', function() {

        var buttons = [{
            text: 'Fra foto bibliotek',
            onClick: function() {
                getPhotoLearning();
            }
        }, {
            text: 'Fra kamera',
            onClick: function() {
                snapPictureLearning();
            }
        }, {
            text: 'Afbryd',
            color: 'red',
            onClick: function() {}
        }, ];
        myApp.actions(buttons);
    });



    function snapPictureLearning() {
        navigator.camera.getPicture(onSuccessLearning, onFail, {
            quality: 50,
            targetWidth: 1280,
            destinationType: Camera.DestinationType.DATA_URL
        });
    }

    function getPhotoLearning() {
        //Specify the source to get the photos.
        navigator.camera.getPicture(onSuccessLearning, onFail, {
            quality: 50,
            targetWidth: 1280,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM
        });
    }

    function onSuccessLearning(imageData) {
        image = 'data:image/jpeg;base64,' + imageData;
        console.log(image);
        var imagedate = moment().format('DD-MM-YYYY');

        var addLearning = 'addLearning';


        myApp.modal({
            title: 'Skriv kort info',
            text: '<textarea name="learningInfo" placeholder="Skriv en kort forklaring"></textarea>',
            buttons: [{
                text: 'Ok',
                onClick: function() {
                    var learningInfo = $('textarea[name="learningInfo"]').val();
                    console.log(learningInfo + ' ' + learningContent.html());
                    if ($("#learningMaterial .col-33-custom").length == 0) {
                        positioningVideo.empty();
                    }
                    var countDivs = $('#learningMaterial .thumbnail').length;
                    if (countDivs == 0) {
                        var totalDivs = 0;
                    } else {
                        var totalDivs = countDivs + 1;
                    }

                    var imagedate = moment().format('LLL');

                    LearningArr.push({
                        url: image,
                        caption: imagedate
                    });
                    $('#learningMaterial').append('<div class="col-33-custom">' +
                        '<div id="' + totalDivs + '" class="thumbnail thumbail--image">' +
                        '<div class="img-container"><img src="' + image + '" alt=""></div>' +
                        '<div class="caption">' +
                        '<p>' + learningInfo + '</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>');
                    $$.post(connection, {
                        "addLearning": addLearning,
                        "imageSrc": image,
                        "imageDate": imagedate,
                        "info": learningInfo,
                    }, function(data) {
                        var result = JSON.parse(data);
                        console.log(result);
                    });

                }
            }, {
                text: 'Afbryd',
                onClick: function() {
                    myApp.alert('Billedet er slettet!')
                }
            }]
        });
    };



    //VIDEO!

    $$('.addLearningVideo').on('click', function() {
        captureVideoLearning();
    });

    function captureSuccessLearning(mediaFiles) {
        var i, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            uploadFileLearning(mediaFiles[i]);
        }
    }

    function captureVideoLearning() {
        navigator.device.capture.captureVideo(captureSuccessLearning, captureError);
    }

    function uploadFileLearning(mediaFile) {

        myApp.modal({
            title: 'Skriv kort info',
            text: '<textarea name="learningInfo" placeholder="Skriv en kort forklaring"></textarea>',
            buttons: [{
                text: 'Ok',
                onClick: function() {
                    var learningInfo = $('textarea[name="learningInfo"]').val();

                    if ($("#learningMaterial .col-33-custom").length == 0) {
                        positioningVideo.empty();
                    }
                    copyBaseLearning(mediaFile, learningInfo);
                }
            }, {
                text: 'Afbryd',
                onClick: function() {
                    myApp.alert('Videon er slettet!')
                }
            }]
        });


    }


    function copyBaseLearning(mediaFile, title) {
        // console.log('Mediafile copybase ' + mediaFile.fullPath);
        var DocPath = cordova.file.documentsDirectory;
        var d = $.now();
        var newName = d + "movie.mov";
        var fullFile = 'file://' + mediaFile.fullPath;
        console.log(title + ' ' + fullFile);
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
                                    winLearning(url, title);

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

    function winLearning(url, title) {
        console.log('winLearning function ' + url);
        var Learning = "Learning";
        var info = title;

        var countDivs = $('#learningMaterial .thumbnail').length;
        if (countDivs == 0) {
            var totalDivs = 0;
        } else {
            var totalDivs = countDivs + 1;
        }

        $('#learningMaterial').append('<div class="col-33-custom">' +
            '<div id="' + totalDivs + '" class="thumbnail thumbnail--video">' +
            '<div class="video-container" data-id="' + url + '"><i></i><p></p></div>' +
            '<div class="caption">' +
            '<p>' + info + '</p>' +
            '</div>' +
            '</div>' +
            '</div>');

        $$.post(connection, {
            "addLearning": 'addLearning',
            "imageSrc": url,
            "info": info,
        }, function(data) {
            var result = JSON.parse(data);
            console.log(result);
        });

        var videodate = moment().format('LLL');

        if ($("#learningMaterial .col-33-custom").length == 0) {
            positioningVideo.empty();
        }
        LearningArr.push({
            html: '<video controls=""><source type="video/mp4" src="' + url + '"></video>',
            caption: videodate
        });

    }
});
