var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        console.log('Device ready');
        // alert('Loading PhoneGap is completed');
        StatusBar.overlaysWebView(false);
        StatusBar.styleLightContent();
        StatusBar.backgroundColorByName("black");
        StatusBar.backgroundColorByHexString("#000000");
    },
};
    
// var connection = "http://169.254.32.78/api.php";
// var connectionVideo = "http://169.254.32.78/uploadvideo.php";
// var connectionSearch = "http://169.254.32.78/search.php";
var connection = "http://192.168.1.7/api.php";
var connectionVideo = "http://192.168.1.7/uploadvideo.php";
var connectionSearch = "http://192.168.1.7/search.php";
// var connection = "http://localhost/api.php";
// var connectionVideo = "http://localhost/uploadvideo.php";
// var connectionSearch = "http://localhost/search.php";

// Export selectors engine
var $$ = Dom7;

var myApp = new Framework7({
    fastClicks: false,
    modalTitle: 'Obs!'
    // onAjaxStart: function(xhr) {
    //     myApp.showIndicator();
    // },
    // onAjaxComplete: function(xhr) {
    //     myApp.hideIndicator();
    // }

});
// Add views
var leftView = myApp.addView('.view-left', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

function captureError(error) {
    var msg = 'An error occurred during capture: ' + error.code;
    console.log(msg);
}
var ProcessArr = [];
var TransferArr = [];
var PositioningArr = [];
var ProcessVideoArr = [];
var TransferVideoArr = [];
var PositioningVideoArr = [];
var LearningArr = [];
moment.locale('da',{
     longDateFormat : {
        LT : "HH:mm",
        LTS : "HH:mm:ss",
        L : "DDMMYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd D MMMM YYYY LT"
    },
});

$$(document).on('pageInit', function(e) {
    var page = e.detail.page;
    if (page.name === 'left-page-1') {
        var id = page.query.id;
        console.log(id);

        $$('.loading--leftview').show();
        var teamnr = id;
        var roomdata = "roomdata";
        $$.post(connection, {
            "roomdata": roomdata,
            'teamnr': teamnr
        }, function(data) {
            var result = JSON.parse(data);
            for (var i = 0; i < result.length; i++) {
                var roomnr = result[i].roomnr;
                $('.roomData').append('<li>' +
                    '<a id="' + roomnr + '" href="left-page-2.html?id=' + roomnr + '" class="item-link getPatientList">' +
                    '<div class="item-content">' +
                    '<div class="item-inner">' +
                    '<div class="item-title">Stue ' + roomnr + '</div>' +
                    '</div>' +
                    '</div>' +
                    '</a>' +
                    '</li>'
                );
            }
            $$('.loading--leftview').hide();
        });
    }
    if (page.name === 'left-page-2') {
        var id = page.query.id;
        console.log(id);

        $$('.loading--leftview').show();

        var roomnr = id;
        var patientListData = "patientListData";
        $$.post(connection, {
            "patientListData": patientListData,
            'roomnr': roomnr
        }, function(data) {
            var result = JSON.parse(data);
            if (result == '') {
                $('#patientHeader').text('Ingen patienter');
            } else {
                for (var i = 0; i < result.length; i++) {
                    var name = result[i].fullname;
                    var id = result[i].id;
                    $('.patientList').append('<li>' +
                        '<a id="' + id + '" href="" class="item-link getPatientInfo">' +
                        '<div class="item-content">' +
                        '<div class="item-inner">' +
                        '<div class="item-title">' + name + '</div>' +
                        '</div>' +
                        '</div>' +
                        '</a>' +
                        '</li>'
                    );
                }
            }
            $$('.loading--leftview').hide();
        });
    }
    if (page.name === 'all') {
        var id = page.query.id;
        console.log(id);

        $$('.loading--leftview').show();
        var type = id;

        $$.post(connection, {
            "type": type
        }, function(data) {
            var result = JSON.parse(data);
            for (var i = 0; i < result.length; i++) {

                if (type == 'allRooms') {
                    if (result == '') {
                        $('#allHeader').text('Ingen stuer endnu');

                    } else {
                        $('#allHeader').text('Alle stuer');
                    }
                    var roomnr = result[i].roomnr;
                    $('.allData').append('<li>' +
                        '<a id="' + roomnr + '" href="left-page-2.html?id=' + roomnr + '" class="item-link getPatientList">' +
                        '<div class="item-content">' +
                        '<div class="item-inner">' +
                        '<div class="item-title">Stue ' + roomnr + '</div>' +
                        '</div>' +
                        '</div>' +
                        '</a>' +
                        '</li>'
                    );
                }
                if (type == 'allPatients') {
                    if (result == '') {
                        $('#allHeader').text('Ingen patienter endnu');

                    } else {
                        $('#allHeader').text('Alle patienter');
                    }
                    var name = result[i].fullname;
                    var id = result[i].id;
                    $('.allData').append('<li>' +
                        '<a id="' + id + '" href="" class="item-link getPatientInfo">' +
                        '<div class="item-content">' +
                        '<div class="item-inner">' +
                        '<div class="item-title">' + name + '</div>' +
                        '</div>' +
                        '</div>' +
                        '</a>' +
                        '</li>'
                    );
                }

            }
            $$('.loading--leftview').hide();
        });

    }
    if (page.name === 'learning') {
        LearningArr.length = 0;
        $$('.loading').show();

        $$.post(connection, {
            "getLearning": 'getLearning',
        }, function(data) {
            var result = JSON.parse(data);
            if (result == '') {
                // $('#patientHeader').text('Ingen patienter');
                console.log('Intet materiale')
            } else {
                for (var i = 0; i < result.length; i++) {
                    var media = result[i].media;
                    var info = result[i].info;
                    var date = result[i].learningdate;

                    if (media.indexOf("image") >= 0) {
                        LearningArr.push({
                            url: media,
                            caption: date
                        });
                        $('#learningMaterial').append('<div class="col-33-custom">' +
                            '<div id="' + i + '" class="thumbnail thumbail--image">' +
                            '<div class="img-container"><img src="' + media + '" alt=""></div>' +
                            '<div class="caption">' +
                            '<p>' + info + '</p>' +
                            '</div>' +
                            '</div>' +
                            '</div>');
                    } else {
                        LearningArr.push({
                            html: '<video controls=""><source type="video/mp4" src="' + media + '"></video>',
                            caption: date
                        });
                        $('#learningMaterial').append('<div class="col-33-custom">' +
                            '<div id="' + i + '" class="thumbnail thumbnail--video">' +
                            '<div class="video-container" data-id="' + media + '"><i></i><p></p></div>' +
                            '<div class="caption">' +
                            '<p>' + info + '</p>' +
                            '</div>' +
                            '</div>' +
                            '</div>');
                    }
                }
            }
            $$('.loading').hide();
        });

        $$(document).on("click", ".thumbnail", function() {

            theMedia = this.id;
            var myVideoBrowserDarkLearning = myApp.photoBrowser({
                photos: LearningArr,
                theme: 'dark'
            });
            myVideoBrowserDarkLearning.open(theMedia);
        });
    }
});

function onFail(message) {
    alert('An error occured: ' + message);
}

$.fn.capitalize = function() {
    $.each(this, function() {
        var split = this.value.split(' ');
        for (var i = 0, len = split.length; i < len; i++) {
            split[i] = split[i].charAt(0).toUpperCase() + split[i].slice(1).toLowerCase();
        }
        this.value = split.join(' ');
    });
    return this;
};

$('.inputName').on('keyup', function() {
    $(this).capitalize();
});
$$(document).on("click", ".fullnameInput", function() {
    $('.inputName').focus();
});
$$(document).on("click", ".patientInput", function() {
    $('.inputPatient').focus();
});
var birthdayInput = myApp.calendar({
    input: '#birthdayInput',
    toolbar: true,
    toolbarCloseText: 'Vælg',
    convertToPopover: false,
    dateFormat: 'dd-mm-yyyy',
    toolbarTemplate:
    '<div class="toolbar">' +
        '<div class="toolbar-inner">' +
            '{{monthPicker}}' +
            '{{yearPicker}}' +
            '<a href="#" class="link close-picker">{{closeText}}</a>' +
        '</div>' +
    '</div>',
}); 
var inlaidInput = myApp.calendar({
    input: '#inlaidInput',
    toolbar: true,
    toolbarCloseText: 'Vælg',
    convertToPopover: false,
    dateFormat: 'dd-mm-yyyy',
    toolbarTemplate:
    '<div class="toolbar">' +
        '<div class="toolbar-inner">' +
            '{{monthPicker}}' +
            '{{yearPicker}}' +
            '<a href="#" class="link close-picker">{{closeText}}</a>' +
        '</div>' +
    '</div>',
}); 

function emptyPatientInfo() {
    var profileImage = $("#profileImage");
    var patientName = $("#patientName");
    var patientBorn = $("#patientBorn");
    var patientinlaid = $("#patientinlaid");
    var patientText = $("#patientText");
    var patientRoom = $("#patientinRoom");

    var positioningImage = $("#positioning-image");
    var positioningVideo = $("#positioning-video");
    var positioningNotes = $("#positioning-notes");

    var transfersImage = $("#transfers-image");
    var transfersVideo = $("#transfers-video");
    var transfersNotes = $("#transfers-notes");

    var processImage = $("#process-image");
    var processVideo = $("#process-video");
    var processNotes = $("#process-notes");

    var searchInput = $('.search');

    profileImage.empty();
    patientName.empty();
    patientBorn.empty();
    patientinlaid.empty();
    patientText.empty();
    patientRoom.empty();
    positioningVideo.empty();
    positioningImage.empty();
    positioningNotes.empty();
    transfersVideo.empty();
    transfersImage.empty();
    transfersNotes.empty();
    processVideo.empty();
    processImage.empty();
    processNotes.empty();
    searchInput.val('');

};

var profileImage = $("#profileImage");
var patientName = $("#patientName");
var patientBorn = $("#patientBorn");
var patientinlaid = $("#patientinlaid");
var patientText = $("#patientText");
var patientRoom = $("#patientinRoom");

var positioningImage = $("#positioning-image");
var positioningVideo = $("#positioning-video");
var positioningNotes = $("#positioning-notes");

var processImage = $("#process-image");
var processVideo = $("#process-video");
var processNotes = $("#process-notes");

var transfersImage = $("#transfers-image");
var transfersVideo = $("#transfers-video");
var transfersNotes = $("#transfers-notes");
var searchInput = $('.search');
var btnDelete = $('.btn--delete');

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

$$('.popupType').on('click', function() {
    type = this.id;
    $('#type').val('');
    $('#type').val(type);
});

$$('.addNote').on('click', function() {
    var type = 'addNote';
    var patientID = $('#patientID').val();
    var theType = $('#type').val();
    var note = $('textarea[name="note"]').val();

    var notedate = moment().format('DD-MM-YYYY, H:mm');
    $$.post(connection, {
        'date': notedate,
        "type": type,
        "id": patientID,
        "note": note,
        "theType": theType
    }, function(data) {
        var result = JSON.parse(data);

        if (result != "error") {
            if (theType == 'transfer') {

                var transferNotesDelete = $('#transfers-notes .deleteContent');

                $.each(transferNotesDelete, function() {
                    var id = $(this).attr('data-index');
                    var oldId = parseInt(id);
                    $(this).attr('data-index', oldId + 1);
                });

                type = "transfernotes";
                var totalDivs;
                var countDivs = $('#transfers-notes .swiper-slide').length;
                if (countDivs == 0) {
                    var totalDivs = 0;
                    transfersNotes.empty();
                } else {
                    var totalDivs = countDivs;
                };
                transfersNotes.prepend('<div class="swiper-slide"><a data-index="0" data-id="' + type + '" id="' + result + '" class="deleteContent">X</a><p class="sliderDate">' + notedate + '</p><p class="sliderNote">' + note + '</p></div>');
                var dots = transfersNotes.siblings()[0];
                $$(dots).show();
            }
            if (theType == 'process') {

                var processNotesDelete = $('#process-notes .deleteContent');

                $.each(processNotesDelete, function() {
                    var id = $(this).attr('data-index');
                    var oldId = parseInt(id);
                    $(this).attr('data-index', oldId + 1);
                });

                var type = "processnotes";
                var totalDivs;
                var countDivs = $('#process-notes .swiper-slide').length;
                if (countDivs == 0) {
                    var totalDivs = 0;
                    processNotes.empty();
                } else {
                    var totalDivs = countDivs;
                };
                processNotes.prepend('<div class="swiper-slide"><a data-index="0" data-id="' + type + '" id="' + result + '" class="deleteContent">X</a><p class="sliderDate">' + notedate + '</p><p class="sliderNote">' + note + '</p></div>');
                var dots = processNotes.siblings()[0];
                $$(dots).show();
            }
            if (theType == 'positioning') {

                var positioningNotesDelete = $('#positioning-notes .deleteContent');

                $.each(positioningNotesDelete, function() {
                    var id = $(this).attr('data-index');
                    var oldId = parseInt(id);
                    $(this).attr('data-index', oldId + 1);
                });

                var type = "positioningnotes";
                var totalDivs;
                var countDivs = $('#positioning-notes .swiper-slide').length;
                if (countDivs == 0) {
                    var totalDivs = 0;
                    positioningNotes.empty();
                } else {
                    var totalDivs = countDivs;
                };
                positioningNotes.prepend('<div class="swiper-slide"><a data-index="0" data-id="' + type + '" id="' + result + '" class="deleteContent">X</a><p class="sliderDate">' + notedate + '</p><p class="sliderNote">' + note + '</p></div>');
                var dots = positioningNotes.siblings()[0];
                $$(dots).show();
            }

            myApp.closeModal('.popup-addNote');

            $('textarea[name="note"]').val('');

        } else {
            myApp.alert('Sorry, something went wrong, try again ' + result);
        }
    });
});

function snapPicture() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        targetWidth: 150,
        targetHeight: 200,
        destinationType: Camera.DestinationType.DATA_URL
    });

}

function onSuccess(imageData) {
    var profileImage = $(".profileImage");
    profileImage.empty();
    image = 'data:image/jpeg;base64,' + imageData;
    profileImage.append('<img src="' + image + '">');
}

function getPhoto() {
    //Specify the source to get the photos.
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        targetWidth: 150,
        targetHeight: 200,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM
    });
}

$$('.profileImage, .addProfileImage').on('click', function() {
    var buttons = [{
        text: 'From photo library',
        onClick: function() {
            getPhoto();
        }
    }, {
        text: 'From Camera',
        onClick: function() {
            snapPicture();
        }
    }, {
        text: 'Cancel',
        color: 'red',
        onClick: function() {}
    }, ];
    myApp.actions(buttons);
});

$$('.addPatient').on('click', function() {
    var addPatient = 'addPatient';
    var imageSrc = $('.profileImage img').attr('src');
    var fullname = $('input[name="fullname"]').val();
    var born = $('input[name="born"]').val();
    var firstFour = born.replace(/-/g, '').slice(0, -4);
    var lastTwo = born.replace(/-/g, '').slice(6, 8);
    var newBorn = firstFour + lastTwo;
    var cpr = $('input[name="cpr"]').val();
    var inlaid = $('input[name="inlaid"]').val();
    var roomnr = $('select[name="roomnr"]').val();
    var description = $('textarea[name="description"]').val();
    var fullCpr = newBorn + "-" + cpr;
    $.post(connection, {
        "addPatient": addPatient,
        "fullname": fullname,
        "born": fullCpr,
        "inlaid": inlaid,
        "roomnr": roomnr,
        "description": description,
        "imageSrc": imageSrc
    }, function(data) {
        var result = JSON.parse(data);
        $$('.noPatient').hide();
        console.log(data);
        if (result != "error") {
            emptyPatientInfo();

            localStorage.setItem("lastPatient", result);
            $('#patientID').val(result);

            btnDelete.attr('id', result);
            if (imageSrc != undefined) {
                profileImage.append('<img src="' + imageSrc + '" alt="' + fullname + '">');
            }
            patientName.text(fullname);
            patientBorn.text('CPR: ' + fullCpr);
            patientinlaid.text('Indlagt: ' + inlaid);
            patientText.text(description);
            patientRoom.text("Stue nr: " + roomnr);
            myApp.closeModal('.popup-addPatient');

            $('.profileImage').empty();
            $('input[name="fullname"]').val('');
            $('input[name="born"]').val('');
            $('input[name="cpr"]').val('');
            $('input[name="inlaid"]').val('');
            $('select[name="roomnr"]').val('');
            $('textarea[name="description"]').val('');

            processImage.append('<div class="no-results"><p>Ingen billeder af proces</p></div>');
            var dots1 = processImage.siblings()[0];
            $$(dots1).hide();

            transfersImage.append('<div class="no-results"><p>Ingen billeder af forflytning</p></div>');
            var dots2 = transfersImage.siblings()[0];
            $$(dots2).hide();

            positioningImage.append('<div class="no-results"><p>Ingen billeder af lejring</p></div>');
            var dots3 = positioningImage.siblings()[0];
            $$(dots3).hide();

            processNotes.append('<div class="no-results"><p>Ingen noter til proces</p></div>')
            var dots4 = processNotes.siblings()[0];
            $$(dots4).hide();

            transfersNotes.append('<div class="no-results"><p>Ingen noter til forflytning</p></div>')
            var dots5 = transfersNotes.siblings()[0];
            $$(dots5).hide();

            positioningNotes.append('<div class="no-results"><p>Ingen noter til lejring</p></div>')
            var dots6 = positioningNotes.siblings()[0];
            $$(dots6).hide();

            processVideo.append('<div class="no-results"><p>Ingen videoer af proces</p></div>')
            var dots7 = processVideo.siblings()[0];
            $$(dots7).hide();

            transfersVideo.append('<div class="no-results"><p>Ingen videoer af forflytning</p></div>')
            var dots8 = transfersVideo.siblings()[0];
            $$(dots8).hide();

            positioningVideo.append('<div class="no-results"><p>Ingen videoer af lejring</p></div>')
            var dots9 = positioningVideo.siblings()[0];
            $$(dots9).hide();

        } else {
            myApp.alert('Sorry, something went wrong, try again ' + result);
        }
    });
});

function snapPicturePositioning() {
    navigator.camera.getPicture(onSuccessPositioning, onFail, {
        quality: 50,
        targetWidth: 1280,
        targetHeight: 960,
        destinationType: Camera.DestinationType.DATA_URL
    });
}

function onSuccessPositioning(imageData) {
    var positioningImage = $("#positioning-image");
    var patientID = $('#patientID').val();
    image = 'data:image/jpeg;base64,' + imageData;
    var imagedate = moment().format('DD-MM-YYYY, H:mm');
    var totalDivs;
    var countDivs = $('#positioning-image .swiper-slide').length;
    if (countDivs == 0) {
        var totalDivs = 0;
        positioningImage.empty();
    } else {
        var totalDivs = countDivs;
    }

    var positioningimagesDivs = $('.openPositioningPhoto');
    var positioningimagesDelete = $('#positioning-image .deleteContent');


    $.each(positioningimagesDivs, function() {
        var id = this.id;
        var oldId = parseInt(id);
        $(this).attr('id',oldId+1);
    });

    $.each(positioningimagesDelete, function() {
        var id = $(this).attr('data-index');
        var oldId = parseInt(id);
        $(this).attr('data-index', oldId + 1);
    });

    PositioningArr.unshift({
        url: image,
        caption: imagedate
    });
    var addImage = 'addImage';
    var table = 'positioningimages';
    var imagerow = 'positioningimage';
    $$.post(connection, {
        "addImage": addImage,
        "imageData": image,
        "patientID": patientID,
        "table": table,
        "imagerow": imagerow,
        "date": imagedate
    }, function(data) {
        var result = JSON.parse(data);
        console.log(result);
        mySwiper7.prependSlide('<div class="swiper-slide"><a data-array="PositioningArr" data-index="0" data-id="' + table + '" id="' + result + '" class="deleteContent">X</a><p class="sliderDate">' + imagedate + '</p><a id="0" href="#" class="openPhoto openPositioningPhoto"><img class="photo" src="' + image + '" alt="' + imagedate + '"></a></div>');
    });

    var dots = positioningImage.siblings()[0];
    $$(dots).show();
    // positioningImage.append('<div class="swiper-slide"><p class="sliderDate">' + imagedate + '</p><a id="' + totalDivs + '" href="#" class="openPhoto openPositioningPhoto"><img class="photo" src="' + image + '" alt="' + imagedate + '"></a></div>');
    mySwiper7.slideTo(0);
}

function getPhotoPositioning() {
    //Specify the source to get the photos.
    navigator.camera.getPicture(onSuccessPositioning, onFail, {
        quality: 50,
        targetWidth: 1280,
        targetHeight: 960,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM
    });
}

$$('.addPositioningImage').on('click', function() {
    var buttons = [{
        text: 'Fra foto bibliotek',
        onClick: function() {
            getPhotoPositioning();
        }
    }, {
        text: 'Fra kamera',
        onClick: function() {
            snapPicturePositioning();
        }
    }, {
        text: 'Afbryd',
        color: 'red',
        onClick: function() {}
    }, ];
    myApp.actions(buttons);
});


$$('.addPositioningVideo').on('click', function() {
    captureVideoPositioning();
});

function captureSuccessPositioning(mediaFiles) {
    var i, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        uploadFilePositioning(mediaFiles[i]);
    }
}


function captureVideoPositioning() {
    navigator.device.capture.captureVideo(captureSuccessPositioning, captureError);
}

function uploadFilePositioning(mediaFile) {

    myApp.prompt('Giv videon en title', 'Video title', function(value) {

        copyBasePositioning(mediaFile, value);
    });
}

function copyBasePositioning(mediaFile, title) {
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
                                winPositioning(url, title);

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

function winPositioning(url, title) {
    var positioningVideo = $("#positioning-video");
    var id = $$('#patientID').val();
    if ($("#positioning-video .swiper-slide").length == 0) {
        positioningVideo.empty();
    }

    var videodate = moment().format('DD-MM-YYYY, H:mm');
    var positioningvideosDivs = $('.openPositioningVideo');
    var positioningvideosDelete = $('#positioning-video .deleteContent');

    var countDivs = $('#positioning-video .swiper-slide').length;
    if (countDivs == 0) {
        var totalDivs = 0;
    } else {
        var totalDivs = countDivs;
    }

    $.each(positioningvideosDivs, function() {
        var id = this.id;
        var oldId = parseInt(id);
        $(this).attr('id',oldId+1);
    });

    $.each(positioningvideosDelete, function() {
        var id = $(this).attr('data-index');
        var oldId = parseInt(id);
        $(this).attr('data-index', oldId + 1);
    });

    PositioningVideoArr.unshift({
        html: '<video controls=""><source type="video/mp4" src="' + url + '"></video>',
        caption: videodate
    });
    var table = "positioningvideo";
    var positioning = "positioning";
    var videotitle = title;
    $$.post(connectionVideo, {
        "positioning": positioning,
        'id': id,
        'videotitle': videotitle,
        'url': url,
        'date':videodate
    }, function(data) {
        console.log(data);
        var result = JSON.parse(data);

        mySwiper8.prependSlide('<div class="swiper-slide"><a data-array="PositioningVideoArr" data-index="0" data-id="' + table + '" id="' + result + '" class="deleteContent">X</a><h3 class="videoTitle">' + title + '</h3><p class="sliderDate">' + videodate + '</p><a id="0" href="#" class="openVideo openPositioningVideo"><video controls=""><source type="video/mp4" src="' + url + '"></video></a></div>');
    });


    var dots = positioningVideo.siblings()[0];
    $$(dots).show();
    mySwiper8.slideTo(0);
}



function snapPictureProcess() {
    navigator.camera.getPicture(onSuccessProcess, onFail, {
        quality: 50,
        targetWidth: 1280,
        targetHeight: 960,
        destinationType: Camera.DestinationType.DATA_URL
    });
}

function onSuccessProcess(imageData) {
    var processImage = $("#process-image");
    var patientID = $('#patientID').val();
    image = 'data:image/jpeg;base64,' + imageData;
    var imagedate = moment().format('DD-MM-YYYY, H:mm');
    var totalDivs;
    var countDivs = $('#process-image .swiper-slide').length;
    if (countDivs == 0) {
        var totalDivs = 0;
        processImage.empty();
    } else {
        var totalDivs = countDivs;
    };

    var processimagesDivs = $('.openProcessPhoto');
    var processimagesDelete = $('#process-image .deleteContent');

    $.each(processimagesDivs, function() {
        var id = this.id;
        var oldId = parseInt(id);
        $(this).attr('id', oldId + 1);
    });
    $.each(processimagesDelete, function() {
        var id = $(this).attr('data-index');
        var oldId = parseInt(id);
        $(this).attr('data-index', oldId + 1);
    });

    ProcessArr.unshift({
        url: image,
        caption: imagedate
    });
    var addImage = 'addImage';
    var table = 'processimages';
    var imagerow = 'processimage';
    $$.post(connection, {
        "addImage": addImage,
        "imageData": image,
        "patientID": patientID,
        "table": table,
        "imagerow": imagerow,
        "date": imagedate
    }, function(data) {
        console.log(data);
        var result = JSON.parse(data);
        mySwiper1.prependSlide('<div class="swiper-slide"><a data-array="ProcessArr" data-index="0" data-id="' + table + '" id="' + result + '" class="deleteContent">X</a><p class="sliderDate">' + imagedate + '</p><a id="0" href="#" class="openPhoto openProcessPhoto"><img class="photo" src="' + image + '" alt="' + imagedate + '"></a></div>')
    });
    var dots1 = processImage.siblings()[0];
    $$(dots1).show();

    mySwiper1.slideTo(0);
}

function getPhotoProcess() {
    navigator.camera.getPicture(onSuccessProcess, onFail, {
        quality: 50,
        targetWidth: 1280,
        targetHeight: 960,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM
    });
}

$$('.addProcessImage').on('click', function() {
    var buttons = [{
        text: 'Fra foto bibliotek',
        onClick: function() {
            getPhotoProcess();
        }
    }, {
        text: 'Fra kamera',
        onClick: function() {
            snapPictureProcess();
        }
    }, {
        text: 'Afbryd',
        color: 'red',
        onClick: function() {}
    }, ];
    myApp.actions(buttons);
});

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

function snapPictureTransfers() {
    navigator.camera.getPicture(onSuccessTransfers, onFail, {
        quality: 50,
        targetWidth: 1280,
        targetHeight: 960,
        destinationType: Camera.DestinationType.DATA_URL
    });
}

function onSuccessTransfers(imageData) {
    var transfersImage = $("#transfers-image");
    var patientID = $('#patientID').val();
    image = 'data:image/jpeg;base64,' + imageData;
    var imagedate = moment().format('DD-MM-YYYY, H:mm');
    var totalDivs;
    var countDivs = $('#transfers-image .swiper-slide').length;
    if (countDivs == 0) {
        var totalDivs = 0;
        transfersImage.empty();
    } else {
        var totalDivs = countDivs;
    }

    var transferimagesDivs = $('.openTransferPhoto');
    var transferimagesDelete = $('#transfers-image .deleteContent');


    $.each(transferimagesDivs, function() {
        var id = this.id;
        var oldId = parseInt(id);
        $(this).attr('id',oldId+1);
    });
    $.each(transferimagesDelete, function() {
        var id = $(this).attr('data-index');
        var oldId = parseInt(id);
        $(this).attr('data-index', oldId + 1);
    });

    TransferArr.unshift({
        url: image,
        caption: imagedate
    });
    var addImage = 'addImage';
    var table = 'transferimages'
    var imagerow = 'transferimage'
    $$.post(connection, {
        "addImage": addImage,
        "imageData": image,
        "patientID": patientID,
        "table": table,
        "imagerow": imagerow,
        "date": imagedate
    }, function(data) {
        var result = JSON.parse(data);
        console.log(result);
        mySwiper4.prependSlide('<div class="swiper-slide"><a data-array="TransferArr" data-index="0" data-id="' + table + '" id="' + result + '" class="deleteContent">X</a><p class="sliderDate">' + imagedate + '</p><a id="0" href="#" class="openPhoto openTransferPhoto"><img class="photo" src="' + image + '" alt="' + imagedate + '"></a></div>');
    });
    var dots = transfersImage.siblings()[0];
    $$(dots).show();
    mySwiper4.slideTo(0);
}

function getPhotoTransfers() {
    //Specify the source to get the photos.
    navigator.camera.getPicture(onSuccessTransfers, onFail, {
        quality: 50,
        targetWidth: 1280,
        targetHeight: 960,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM
    });
}

$$('.addTransfersImage').on('click', function() {
    var buttons = [{
        text: 'Fra foto bibliotek',
        onClick: function() {
            getPhotoTransfers();
        }
    }, {
        text: 'Fra kamera',
        onClick: function() {
            snapPictureTransfers();
        }
    }, {
        text: 'Afbryd',
        color: 'red',
        onClick: function() {}
    }, ];
    myApp.actions(buttons);
});


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

        copyBaseTransfer(mediaFile, value);
    });
}

function copyBaseTransfer(mediaFile, title) {
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
    var transfersVideo = $("#transfers-video");
    var id = $$('#patientID').val();
    if ($("#transfers-video .swiper-slide").length == 0) {
        transfersVideo.empty();
    }
    var videodate = moment().format('DD-MM-YYYY, H:mm');
    
    var countDivs = $('#transfers-video .swiper-slide').length;
    if (countDivs == 0) {
        var totalDivs = 0;
    } else {
        var totalDivs = countDivs + 1;
    }

    var transfervideosDivs = $('.openTransferVideo');
    var transfervideosDelete = $('#transfers-video .deleteContent');

    $.each(transfervideosDivs, function() {
        var id = this.id;
        var oldId = parseInt(id);
        $(this).attr('id',oldId+1);
    });

    $.each(transfervideosDelete, function() {
        var id = $(this).attr('data-index');
        var oldId = parseInt(id);
        $(this).attr('data-index', oldId + 1);
    });

    TransferVideoArr.unshift({
        html: '<video controls=""><source type="video/mp4" src="' + url + '"></video>',
        caption: videodate
    });
    var table = "transfervideo";
    var transfer = "transfer";
    var videotitle = title;
    $$.post(connectionVideo, {
        "transfer": transfer,
        'id': id,
        'videotitle': videotitle,
        'url': url,
        'date':videodate
    }, function(data) {
        console.log(data);
        var result = JSON.parse(data);

        mySwiper5.prependSlide('<div class="swiper-slide"><a data-array="TransferVideoArr" data-index="0" data-id="' + table + '" id="' + result + '" class="deleteContent">X</a><h3 class="videoTitle">' + title + '</h3><p class="sliderDate">' + videodate + '</p><a id="0" href="#" class="openVideo openTransferVideo"><video controls=""><source type="video/mp4" src="' + url + '"></video></a></div>');

    });

    var dots = transfersVideo.siblings()[0];
    $$(dots).show();
    mySwiper5.slideTo(0);
}



$$('.btn--delete').on('click', function() {
    id = this.id;

    myApp.confirm('Dette vil slette patient og alt tilhørende', function() {
        localStorage.clear();
        emptyPatientInfo();
        $$('.noPatient').show();

        var deletePatient = 'deletePatient';
        $$.post(connection, {
            "type": deletePatient,
            'id': id
        }, function(data) {});
    });
});
$$(document).on("click", ".deleteContent", function() {
    self = $(this);
    var dataArray = self.attr('data-array');
    var indexID = self.attr('data-index');

    var id = this.id;
    var category = self.attr('data-id');
    myApp.confirm('Vil du slette dette?', function() {

        var deleteItem = 'deleteItem';
        $$.post(connection, {
            "type": deleteItem,
            'id': id,
            'category': category,
        }, function(data) {
            var result = JSON.parse(data);
            if (result == "success") {
                if (dataArray == 'ProcessArr') {
                    mySwiper1.removeSlide(indexID);
                    ProcessArr.splice(indexID, 1);

                    var processimagesDivs = $('.openProcessPhoto');
                    var processimagesDelete = $('#process-image .deleteContent');

                    $.each(processimagesDivs, function(index) {
                        $(this).attr('id', index);
                    });
                    $.each(processimagesDelete, function(index) {
                        $(this).attr('data-index', index);
                    });

                    if (ProcessArr.length == 0) {
                        processImage.empty();
                        processImage.append('<div class="no-results"><p>Ingen process billeder</p></div>');
                        var dots = processImage.siblings()[0];
                        $$(dots).hide();
                    }
                }
                if (dataArray == 'TransferArr') {
                    mySwiper4.removeSlide(indexID);
                    TransferArr.splice(indexID, 1);

                    var transferimagesDivs = $('.openTransferPhoto');
                    var transferimagesDelete = $('#transfers-image .deleteContent');

                    $.each(transferimagesDivs, function(index) {
                        $(this).attr('id', index);
                    });
                    $.each(transferimagesDelete, function(index) {
                        $(this).attr('data-index', index);
                    });

                    if (TransferArr.length == 0) {
                        transfersImage.empty();
                        transfersImage.append('<div class="no-results"><p>Ingen billeder af flytninger</p></div>');
                        var dots = transfersImage.siblings()[0];
                        $$(dots).hide();
                    }
                }
                if (dataArray == 'PositioningArr') {
                    mySwiper7.removeSlide(indexID);
                    PositioningArr.splice(indexID, 1);

                    var positioningimagesDivs = $('.openPositioningPhoto');
                    var positioningimagesDelete = $('#positioning-image .deleteContent');

                    $.each(positioningimagesDivs, function(index) {
                        $(this).attr('id', index);
                    });
                    $.each(positioningimagesDelete, function(index) {
                        $(this).attr('data-index', index);
                    });

                    if (PositioningArr.length == 0) {
                        positioningImage.empty();
                        positioningImage.append('<div class="no-results"><p>Ingen billeder af lejringer</p></div>');
                        var dots = positioningImage.siblings()[0];
                        $$(dots).hide();
                    }
                }
                if (dataArray == 'PositioningVideoArr') {
                    mySwiper8.removeSlide(indexID);
                    PositioningVideoArr.splice(indexID, 1);

                    var positioningvideosDivs = $('.openPositioningVideo');
                    var positioningvideosDelete = $('#positioning-video .deleteContent');

                    $.each(positioningvideosDivs, function(index) {
                        $(this).attr('id', index);
                    });
                    $.each(positioningvideosDelete, function(index) {
                        $(this).attr('data-index', index);
                    });

                    if (PositioningVideoArr.length == 0) {
                        positioningVideo.empty();
                        positioningVideo.append('<div class="no-results"><p>Ingen videoer af lejring</p></div>');
                        var dots = positioningVideo.siblings()[0];
                        $$(dots).hide();
                    }
                }
                if (dataArray == 'ProcessVideoArr') {
                    mySwiper2.removeSlide(indexID);
                    ProcessVideoArr.splice(indexID, 1);

                    var processvideosDivs = $('.openProcessVideo');
                    var processvideosDelete = $('#process-video .deleteContent');

                    $.each(processvideosDivs, function(index) {
                        $(this).attr('id', index);
                    });
                    $.each(processvideosDelete, function(index) {
                        $(this).attr('data-index', index);
                    });

                    if (ProcessVideoArr.length == 0) {
                        processVideo.empty();
                        processVideo.append('<div class="no-results"><p>Ingen process videoer</p></div>');
                        var dots = processVideo.siblings()[0];
                        $$(dots).hide();
                    }
                }
                if (dataArray == 'TransferVideoArr') {
                    mySwiper5.removeSlide(indexID);
                    TransferVideoArr.splice(indexID, 1);

                    var transfervideosDivs = $('.openTransferVideo');
                    var transfervideosDelete = $('#transfers-video .deleteContent');

                    $.each(transfervideosDivs, function(index) {
                        $(this).attr('id', index);
                    });
                    $.each(transfervideosDelete, function(index) {
                        $(this).attr('data-index', index);
                    });

                    if (TransferVideoArr.length == 0) {
                        transfersVideo.empty();
                        transfersVideo.append('<div class="no-results"><p>Ingen videoer af forflytninger</p></div>');
                        var dots = transfersVideo.siblings()[0];
                        $$(dots).hide();
                    }
                }
                if (category == 'processnotes') {
                    mySwiper3.removeSlide(indexID);

                    var processNotesDelete = $('#process-notes .deleteContent');
                    $.each(processNotesDelete, function(index) {
                        $(this).attr('data-index', index);
                    });
                    var totalDivs;
                    var countDivs = $('#process-notes .swiper-slide').length;
                    if (countDivs == 0) {
                        var totalDivs = 0;
                        processNotes.empty();
                        processNotes.append('<div class="no-results"><p>Ingen process noter</p></div>');
                        var dots = processNotes.siblings()[0];
                        $$(dots).hide();
                    };
                }
                if (category == 'positioningnotes') {
                    mySwiper9.removeSlide(indexID);

                    var positioningNotesDelete = $('#positioning-notes .deleteContent');
                    $.each(positioningNotesDelete, function(index) {
                        $(this).attr('data-index', index);
                    });
                    var totalDivs;
                    var countDivs = $('#positioning-notes .swiper-slide').length;
                    if (countDivs == 0) {
                        var totalDivs = 0;
                        positioningNotes.empty();
                        positioningNotes.append('<div class="no-results"><p>Ingen lejrings noter</p></div>');
                        var dots = positioningNotes.siblings()[0];
                        $$(dots).hide();
                    };
                }
                if (category == 'transfernotes') {
                    mySwiper6.removeSlide(indexID);

                    var transferNotesDelete = $('#transfers-notes .deleteContent');
                    
                    $.each(transferNotesDelete, function(index) {
                        $(this).attr('data-index', index);
                    });
                    var totalDivs;
                    var countDivs = $('#transfers-notes .swiper-slide').length;
                    if (countDivs == 0) {
                        var totalDivs = 0;
                        transfersNotes.empty();
                        transfersNotes.append('<div class="no-results"><p>Ingen forflytnings noter</p></div>');
                        var dots = transfersNotes.siblings()[0];
                        $$(dots).hide();
                    };
                }
            }
        });
    });
});

// $$(document).on("click", ".getAll", function() {
//     $$('.loading--leftview').show();
//     var type = this.id;

//     $$.post(connection, {
//         "type": type
//     }, function(data) {
//         var result = JSON.parse(data);
//         for (var i = 0; i < result.length; i++) {

//             if (type == 'allRooms') {
//                 if (result == '') {
//                     $('#allHeader').text('Ingen stuer endnu');

//                 } else {
//                     $('#allHeader').text('Alle stuer');
//                 }
//                 var roomnr = result[i].roomnr;
//                 $('.allData').append('<li>' +
//                     '<a id="' + roomnr + '" href="left-page-2.html" class="item-link getPatientList">' +
//                     '<div class="item-content">' +
//                     '<div class="item-inner">' +
//                     '<div class="item-title">Stue ' + roomnr + '</div>' +
//                     '</div>' +
//                     '</div>' +
//                     '</a>' +
//                     '</li>'
//                 );
//             }
//             if (type == 'allPatients') {
//                 if (result == '') {
//                     $('#allHeader').text('Ingen patienter endnu');

//                 } else {
//                     $('#allHeader').text('Alle patienter');
//                 }
//                 var name = result[i].fullname;
//                 var id = result[i].id;
//                 $('.allData').append('<li>' +
//                     '<a id="' + id + '" href="" class="item-link getPatientInfo">' +
//                     '<div class="item-content">' +
//                     '<div class="item-inner">' +
//                     '<div class="item-title">' + name + '</div>' +
//                     '</div>' +
//                     '</div>' +
//                     '</a>' +
//                     '</li>'
//                 );
//             }

//         }
//         $$('.loading--leftview').hide();
//     });
// });

var lastID = localStorage.getItem("lastPatient");

function patientInfo(whereistheidfrom, newid) {
    var patientInfo = "patientInfo";
    var id = whereistheidfrom;
    $('#patientID').val('');
    if (id == 'stored') {
        $('#patientID').val(lastID);
        var getInfo = lastID;
        btnDelete.attr('id',getInfo);
    }
    if (id == 'new') {
        $('#patientID').val(newid);
        var getInfo = newid;
        localStorage.setItem("lastPatient", newid);
        btnDelete.attr('id',getInfo);
    }
    $$('.loading').show();
    $$.post(connection, {
        "patientInfo": patientInfo,
        'id': getInfo
    }, function(data) {
        $$('.noPatient').hide();
        var result = JSON.parse(data);
        for (var i = 0; i < result.length; i++) {
            var roomnr = result[i].roomnr;
            var name = result[i].fullname;
            var profileimage = result[i].profileimage;
            var infotext = result[i].infotext;

            var born = result[i].born;

            var inlaid = result[i].inlaid;

            profileImage.append('<img src="' + profileimage + '" alt="' + name + '">');
            patientName.text(name);
            patientBorn.text('CPR: ' + born);
            patientinlaid.text('Indlagt: ' + inlaid);
            patientText.text(infotext);
            patientRoom.text("Stue nr: "+roomnr);

        }

        $$('.loading').hide();
    });

};

function getImages(id, type) {
    ProcessArr.length = 0;
    TransferArr.length = 0;
    PositioningArr.length = 0;
    var type = type;
    $$('.loading').show();
    $$.post(connection, {
        "type": type,
        'id': id
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            if (type == 'processimages') {
                console.log('no processimages');
                processImage.append('<div class="no-results"><p>Ingen process billeder</p></div>');
                var dots = processImage.siblings()[0];
                $$(dots).hide();
            }
            if (type == 'transferimages') {
                console.log('no transferimages');
                transfersImage.append('<div class="no-results"><p>Ingen billeder af flytninger</p></div>');
                var dots = transfersImage.siblings()[0];
                $$(dots).hide();
            }
            if (type == 'positioningimages') {
                console.log('no positioningimages');
                positioningImage.append('<div class="no-results"><p>Ingen billeder af lejringer</p></div>');
                var dots = positioningImage.siblings()[0];
                $$(dots).hide();
            }
        } else {
            if (type == 'processimages') {

                $.each(result, function() {
                    ProcessArr.push({
                        url: this.processimage,
                        caption: this.processimagedate
                    });
                });
                for (var i = 0; i < result.length; i++) {
                    var image = result[i].processimage;
                    var imagedate = result[i].processimagedate;
                    var id = result[i].id;
                    processImage.append('<div class="swiper-slide"><a data-array="ProcessArr" data-index="'+i+'" data-id="'+type+'" id="'+id+'" class="deleteContent">X</a><p class="sliderDate">' + imagedate + '</p><a id="'+i+'" href="#" class="openPhoto openProcessPhoto"><img class="photo" src="' + image + '" alt="' + imagedate + '"></a></div>');
                }
            }
            if (type == 'transferimages') {
                $.each(result, function() {
                    TransferArr.push({
                        url: this.transferimage,
                        caption: this.transferimagedate
                    });
                });
                for (var i = 0; i < result.length; i++) {
                    var image = result[i].transferimage;
                    var imagedate = result[i].transferimagedate;
                    var id = result[i].id;
                    transfersImage.append('<div class="swiper-slide test"><a data-array="TransferArr" data-index="'+i+'" data-id="'+type+'" id="'+id+'" class="deleteContent">X</a><p class="sliderDate">' + imagedate + '</p><a id="'+i+'" href="#" class="openPhoto openTransferPhoto"><img class="photo" src="' + image + '" alt="' + imagedate + '"></a></div>');
                }
            }
            if (type == 'positioningimages') {
                $.each(result, function() {
                    PositioningArr.push({
                        url: this.positioningimage,
                        caption: this.positioningimagedate
                    });
                });
                for (var i = 0; i < result.length; i++) {
                    var image = result[i].positioningimage;
                    var imagedate = result[i].positioningimagedate;
                    var id = result[i].id;
                    positioningImage.append('<div class="swiper-slide"><a data-array="PositioningArr" data-index="'+i+'" data-id="'+type+'" id="'+id+'" class="deleteContent">X</a><p class="sliderDate">' + imagedate + '</p><a id="'+i+'" href="#" class="openPhoto openPositioningPhoto"><img class="photo" src="' + image + '" alt="' + imagedate + '"></a></div>');
                }
            }
        }
        $$('.loading').hide();
    });
};

function getNotes(id, type) {
    var type = type;
    $$('.loading').show();
    $$.post(connection, {
        "type": type,
        'id': id
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            if (type == 'processnotes') {
                console.log('no processnotes');
                processNotes.append('<div class="no-results"><p>Ingen process noter</p></div>')
                var dots = processNotes.siblings()[0];
                $$(dots).hide();
            }
            if (type == 'transfernotes') {
                console.log('no transfernotes');
                transfersNotes.append('<div class="no-results"><p>Ingen forflytnings noter</p></div>')
                var dots = transfersNotes.siblings()[0];
                $$(dots).hide();
            }
            if (type == 'positioningnotes') {
                console.log('no positioningnotes');
                positioningNotes.append('<div class="no-results"><p>Ingen lejrings noter</p></div>')
                var dots = positioningNotes.siblings()[0];
                $$(dots).hide();
            }
        } else {
            if (type == 'processnotes') {
                for (var i = 0; i < result.length; i++) {
                    var note = result[i].processnote;
                    var notedate = result[i].processnotedate;
                    var id = result[i].id;
                    processNotes.append('<div class="swiper-slide"><a data-index="'+i+'" data-id="'+type+'" id="'+id+'" class="deleteContent">X</a><p class="sliderDate">' + notedate + '</p><p class="sliderNote">' + note + '</p></div>');
                }
            }
            if (type == 'transfernotes') {
                for (var i = 0; i < result.length; i++) {
                    var note = result[i].transfernote;
                    var notedate = result[i].transfernotedate;
                    var id = result[i].id;
                    transfersNotes.append('<div class="swiper-slide"><a data-index="'+i+'" data-id="'+type+'" id="'+id+'" class="deleteContent">X</a><p class="sliderDate">' + notedate + '</p><p class="sliderNote">' + note + '</p></div>');
                }
            }
            if (type == 'positioningnotes') {
                for (var i = 0; i < result.length; i++) {
                    var note = result[i].positioningnote;
                    var notedate = result[i].positioningnotedate;
                    var id = result[i].id;
                    positioningNotes.append('<div class="swiper-slide"><a data-index="'+i+'" data-id="'+type+'" id="'+id+'" class="deleteContent">X</a><p class="sliderDate">' + notedate + '</p><p class="sliderNote">' + note + '</p></div>');
                }
            }
        }
        $$('.loading').hide();
    });
};

function getVideos(id, type) {
    ProcessVideoArr.length = 0;
    TransferVideoArr.length = 0;
    PositioningVideoArr.length = 0;
    var type = type;
    $$('.loading').show();
    $$.post(connection, {
        "type": type,
        'id': id
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            if (type == 'processvideos') {
                console.log('no processimages');
                processVideo.append('<div class="no-results"><p>Ingen process videoer</p></div>')
                var dots = processVideo.siblings()[0];
                $$(dots).hide();
            }
            if (type == 'transfervideos') {
                console.log('no transferimages');
                transfersVideo.append('<div class="no-results"><p>Ingen videoer af forflytninger</p></div>')
                var dots = transfersVideo.siblings()[0];
                $$(dots).hide();
            }
            if (type == 'positioningvideos') {
                console.log('no positioningimages');
                positioningVideo.append('<div class="no-results"><p>Ingen videoer af lejring</p></div>')
                var dots = positioningVideo.siblings()[0];
                $$(dots).hide();
            }
        } else {
            if (type == 'processvideos') {
                $.each(result, function() {
                    ProcessVideoArr.push({
                        html: '<video controls=""><source type="video/mp4" src="' + this.processvideo + '"></video>',
                        caption: this.processvideodate
                    });
                });
                for (var i = 0; i < result.length; i++) {
                    var video = result[i].processvideo;
                    var videodate = result[i].processvideodate;
                    var videotitle = result[i].processvideotitle;
                    var id = result[i].id;
                    processVideo.append('<div class="swiper-slide"><a data-array="ProcessVideoArr" data-index="'+i+'" data-id="processvideo" id="'+id+'" class="deleteContent">X</a><h3 class="videoTitle">' + videotitle + '</h3><p class="sliderDate">' + videodate + '</p><a id="'+i+'" href="#" class="openVideo openProcessVideo"><video controls><source type="video/mp4" src="' + video + '"></video></a></div>');
                }
            }
            if (type == 'transfervideos') {
                $.each(result, function() {
                    TransferVideoArr.push({
                        html: '<video controls=""><source type="video/mp4" src="' + this.transfervideo + '"></video>',
                        caption: this.transfervideodate
                    });
                });
                for (var i = 0; i < result.length; i++) {
                    var video = result[i].transfervideo;
                    var videodate = result[i].transfervideodate;
                    var videotitle = result[i].transfervideotitle;
                    var id = result[i].id;
                    transfersVideo.append('<div class="swiper-slide"><a data-array="TransferVideoArr" data-index="'+i+'" data-id="transfervideo" id="'+id+'" class="deleteContent">X</a><h3 class="videoTitle">' + videotitle + '</h3><p class="sliderDate">' + videodate + '</p><a id="'+i+'" href="#" class="openVideo openTransferVideo"><video controls><source type="video/mp4" src="' + video + '"></video></a></div>');
                }
            }
            if (type == 'positioningvideos') {
                $.each(result, function() {
                    PositioningVideoArr.push({
                        html: '<video controls=""><source type="video/mp4" src="' + this.positioningvideo + '"></video>',
                        caption: this.positioningvideodate
                    });
                });
                for (var i = 0; i < result.length; i++) {
                    var video = result[i].positioningvideo;
                    var videodate = result[i].positioningvideodate;
                    var videotitle = result[i].positioningvideotitle;
                    var id = result[i].id;
                    positioningVideo.append('<div class="swiper-slide"><a data-array="PositioningVideoArr" data-index="'+i+'" data-id="positioningvideo" id="'+id+'" class="deleteContent">X</a><h3 class="videoTitle">' + videotitle + '</h3><p class="sliderDate">' + videodate + '</p><a id="'+i+'" href="#" class="openVideo openPositioningVideo"><video controls><source type="video/mp4" src="' + video + '"></video></a></div>');
                }
            }
        }
        $$('.loading').hide();
    });
};

$$(document).on("click", ".getPatientInfo", function() {
    var patientID = this.id;
    emptyPatientInfo();

    patientInfo('new', patientID);

    getImages(patientID, 'processimages');
    getImages(patientID, 'transferimages');
    getImages(patientID, 'positioningimages');

    getNotes(patientID, 'processnotes');
    getNotes(patientID, 'transfernotes');
    getNotes(patientID, 'positioningnotes');

    getVideos(patientID, 'processvideos');
    getVideos(patientID, 'transfervideos');
    getVideos(patientID, 'positioningvideos');
});

//Load last patient

if (lastID === null) {
    $$('.noPatient').show();
} else {
    $$('.noPatient').hide();
    emptyPatientInfo();
    patientInfo('stored');
    getImages(lastID, 'transferimages');
    getImages(lastID, 'processimages');
    getImages(lastID, 'positioningimages');

    getNotes(lastID, 'processnotes');
    getNotes(lastID, 'transfernotes');
    getNotes(lastID, 'positioningnotes');

    getVideos(lastID, 'processvideos');
    getVideos(lastID, 'transfervideos');
    getVideos(lastID, 'positioningvideos');
}

// $$(document).on("click", ".getPatientList", function() {
//     $$('.loading--leftview').show();

//     var roomnr = this.id;
//     var patientListData = "patientListData";
//     $$.post(connection, {
//         "patientListData": patientListData,
//         'roomnr': roomnr
//     }, function(data) {
//         var result = JSON.parse(data);
//         if (result == '') {
//             $('#patientHeader').text('Ingen patienter');
//         } else {
//             for (var i = 0; i < result.length; i++) {
//                 var name = result[i].fullname;
//                 var id = result[i].id;
//                 $('.patientList').append('<li>' +
//                     '<a id="' + id + '" href="" class="item-link getPatientInfo">' +
//                     '<div class="item-content">' +
//                     '<div class="item-inner">' +
//                     '<div class="item-title">' + name + '</div>' +
//                     '</div>' +
//                     '</div>' +
//                     '</a>' +
//                     '</li>'
//                 );
//             }
//         }
//         $$('.loading--leftview').hide();
//     });
// });

$$(document).on("click", ".openProcessPhoto", function() {
    theImage = $(this).find('img').attr('src');
    var myPhotoBrowserDarkProcess = myApp.photoBrowser({
        photos: ProcessArr,
        theme: 'dark'
    });
    var indexNr = this.id;
    myPhotoBrowserDarkProcess.open(indexNr);
});

$$(document).on("click", ".openTransferPhoto", function() {
    theImage = $(this).find('img').attr('src');

    var myPhotoBrowserDarkTransfer = myApp.photoBrowser({
        photos: TransferArr,
        theme: 'dark'
    });

    var indexNr = this.id;
    myPhotoBrowserDarkTransfer.open(indexNr);
});
$$(document).on("click", ".openPositioningPhoto", function() {
    theImage = $(this).find('img').attr('src');

    var myPhotoBrowserDarkPositioning = myApp.photoBrowser({
        photos: PositioningArr,
        theme: 'dark'
    });

    var indexNr = this.id;
    myPhotoBrowserDarkPositioning.open(indexNr);
});

$$(document).on("click", ".openProcessVideo", function() {
    theVideo = $(this).html();
    var myVideoBrowserDarkProcess = myApp.photoBrowser({
        photos: ProcessVideoArr,
        theme: 'dark'
    });
    var indexNr = this.id;
    myVideoBrowserDarkProcess.open(indexNr);
});
$$(document).on("click", ".openTransferVideo", function() {

    theVideo = $(this).html();
    var myVideoBrowserDarkTransfer = myApp.photoBrowser({
        photos: TransferVideoArr,
        theme: 'dark'
    });
    var indexNr = this.id;
    myVideoBrowserDarkTransfer.open(indexNr);
});
$$(document).on("click", ".openPositioningVideo", function() {
console.log('test');
console.log(PositioningVideoArr);
console.log(this.id);
    theVideo = $(this).html();
    var myVideoBrowserDarkPositioning = myApp.photoBrowser({
        photos: PositioningVideoArr,
        theme: 'dark'
    });

    var indexNr = this.id;
    myVideoBrowserDarkPositioning.open(indexNr);
});

// $$(document).on("click", ".team", function() {
//   $$('.loading--leftview').show();
//     var teamnr = this.id;
//     var roomdata = "roomdata";
//     $$.post(connection, {"roomdata": roomdata, 'teamnr' : teamnr}, function (data) {
//         var result = JSON.parse(data);
//         for (var i = 0; i < result.length; i++) {
//             var roomnr = result[i].roomnr;
//             $('.roomData').append('<li>'+
//             '<a id="'+roomnr+'" href="left-page-2.html" class="item-link getPatientList">'+
//               '<div class="item-content">'+
//                 '<div class="item-inner">'+
//                   '<div class="item-title">Stue '+roomnr+'</div>'+
//                 '</div>'+
//               '</div>'+
//             '</a>'+
//           '</li>'
//           );
//         }
//         $$('.loading--leftview').hide();
//     });
// });
var searchbar = $('.searchbar');
var results = $('#results');
var cancelBtn = $('.searchbar-cancel');
var overlay = $('.searchbar-overlay');
$("input[type=search]").focus(function() {
    if (!overlay.hasClass('active')) {
        overlay.addClass('active');
    }
});
$("input[type=search]").focusout(function() {
    if (overlay.hasClass('active')) {
        overlay.removeClass('active');
        cancelBtn.css('margin-right', '-53px');
        results.fadeOut();
    }
    if (searchbar.hasClass('searchbar-active')) {
        searchbar.removeClass('searchbar-active');
    }
    searchInput.val('');
});

$('.search').blur(function() {
    if (!this.value) {
        results.fadeOut();
    }
});

$(".search").keyup(function() {

    var search_keyword_value = $(this).val();

    if (search_keyword_value == "") {
        results.fadeOut();
    }
    var dataString = 'search_keyword=' + search_keyword_value;
    if (search_keyword_value != '') {
        $.ajax({
            type: "POST",
            url: connectionSearch,
            data: dataString,
            cache: false,
            success: function(html) {
                $("#results").html(html).show();
            }
        });
    }
    return false;
});

var mySwiper1 = myApp.swiper('.process-image', {
    pagination: '.process-image .swiper-pagination',
    observer: true,
    observeParents: true,

});
var mySwiper2 = myApp.swiper('.process-video', {
    pagination: '.process-video .swiper-pagination',
    observer: true,
    observeParents: true,

});
var mySwiper3 = myApp.swiper('.process-notes', {
    pagination: '.process-notes .swiper-pagination',
    observer: true,
    observeParents: true,

});
var mySwiper4 = myApp.swiper('.transfers-image', {
    pagination: '.transfers-image .swiper-pagination',
    observer: true,
    observeParents: true,
});
var mySwiper5 = myApp.swiper('.transfers-video', {
    pagination: '.transfers-video .swiper-pagination',
    observer: true,
    observeParents: true,
});
var mySwiper6 = myApp.swiper('.transfers-notes', {
    pagination: '.transfers-notes .swiper-pagination',
    observer: true,
    observeParents: true,
});
var mySwiper7 = myApp.swiper('.positioning-image', {
    pagination: '.positioning-image .swiper-pagination',
    observer: true,
    observeParents: true,

});
var mySwiper8 = myApp.swiper('.positioning-video', {
    pagination: '.positioning-video .swiper-pagination',
    observer: true,
    observeParents: true,
});
var mySwiper9 = myApp.swiper('.positioning-notes', {
    pagination: '.positioning-notes .swiper-pagination',
    observer: true,
    observeParents: true,
});
$$(".tabs-menu li").click(function(event) {

    event.preventDefault();
    // $(this).parent().addClass("current");
    $(this).addClass("current");
    // $(this).parent().siblings().removeClass("current");
    $(this).siblings().removeClass("current");
    var tab = $(this).attr("data-id");
    $(".tab-content").not(tab).addClass('hide');
    $(tab).removeClass('hide');
});

$$(".toggler").click(function(event) {
    event.preventDefault();
    if (!$(this).hasClass('open')) {
        $(this).addClass('open');
    }
    else{
        $(this).removeClass('open')
    }
});

$$(".panel-overlay").click(function(event) {
    if ($(".toggler").hasClass('open')) {
        $(".toggler").removeClass('open');
        leftView.router.loadPage('index.html');
        setTimeout(function() {
        $('.view-left .page-on-left').remove();
        }, 1000);
    }
});

//# sourceMappingURL=site.js.map