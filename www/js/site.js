// Initialize your app
var myApp = new Framework7({
     onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    }

});

var connection = "http://localhost/api.php";
var connectionVideo = "http://localhost/uploadvideo.php";
var connectionSearch = "http://localhost/search.php";

// Export selectors engine
var $$ = Dom7;

// Add views
var leftView = myApp.addView('.view-left', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    console.log('Loading PhoneGap is completed');
}

function onFail(message) {
    alert('An error occured: ' + message);
}

function captureError(error) {
    var msg = 'An error occurred during capture: ' + error.code;
    navigator.notification.alert(msg, null, 'Uh oh!');
}

function emptyPatientInfo() {
    var profileImage = $("#profileImage");
    var patientName = $("#patientName");
    var patientBorn = $("#patientBorn");
    var patientinlaid = $("#patientinlaid");
    var patientText = $("#patientText");

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

var profileImage =  $("#profileImage");
var patientName = $("#patientName");
var patientBorn = $("#patientBorn");
var patientinlaid = $("#patientinlaid");
var patientText = $("#patientText");

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
$$('.popupType').on('click', function(){
    type = this.id;
    $('#type').val('');
    $('#type').val(type);
});

$$('.addNote').on('click', function(){
    var type = 'addNote';
    var patientID = $('#patientID').val();
    var theType = $('#type').val();
    var note = $('textarea[name="note"]').val();

  $$.post(connection, {"type": type, "id": patientID,"note": note,"theType":theType}, function (data) {
        var result = JSON.parse(data);
        var notedate = moment().format('DD-MM-YYYY');

        if(result === "success"){
            if(theType == 'transfer'){

                transfersNotes.append('<div class="swiper-slide test"><p class="sliderDate">' + notedate + '</p><p class="sliderNote">' + note + '</p></div>');
            }
            if(theType == 'process'){

                processNotes.append('<div class="swiper-slide test"><p class="sliderDate">' + notedate + '</p><p class="sliderNote">' + note + '</p></div>');
            }
            if(theType == 'positioning'){

                positioningNotes.append('<div class="swiper-slide test"><p class="sliderDate">' + notedate + '</p><p class="sliderNote">' + note + '</p></div>');
            }

            myApp.closeModal('.popup-addNote');

            $('textarea[name="note"]').val('');

        } else{
            myApp.alert('Sorry, something went wrong, try again '+result);
        }
    });
}); 
function snapPicture() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
    });
}

function onSuccess(imageData) {
    var profileImage = $(".profileImage");
    profileImage.empty();
    image = 'data:image/jpeg;base64,' + imageData;
    profileImage.append('<img src="' + image + '" alt="' + name + '">');
}

function getPhoto() {
    //Specify the source to get the photos.
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
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
        onClick: function() {
        }
    }, ];
    myApp.actions(buttons);
});

$$('.addPatient').on('click', function(){
var addPatient = 'addPatient';
var imageSrc = $('.profileImage img').attr('src');
var fullname = $('input[name="fullname"]').val();
var born = $('input[name="born"]').val();
var inlaid = $('input[name="inlaid"]').val();
var roomnr = $('select[name="roomnr"]').val();
var description = $('textarea[name="description"]').val();
  $$.post(connection, {"addPatient": addPatient, "fullname": fullname,"born": born,"inlaid":inlaid,"roomnr": roomnr,"description": description,"imageSrc": imageSrc}, function (data) {
        var result = JSON.parse(data);
        if(result === "success"){
            emptyPatientInfo();

            profileImage.append('<img src="' + imageSrc + '" alt="' + fullname + '">');
            patientName.text(fullname);
            patientBorn.text('Født: ' + born);
            patientinlaid.text('Indlagt: ' +inlaid);
            patientText.text(description);
            myApp.closeModal('.popup');

            $('.profileImage').empty();
            $('input[name="fullname"]').val('');
            $('input[name="born"]').val('');
            $('input[name="inlaid"]').val('');
            $('select[name="roomnr"]').val('');
            $('textarea[name="description"]').val('');

        } else{
            myApp.alert('Sorry, something went wrong, try again '+result);
        }
    });
}); 
function snapPicturePositioning() {
    navigator.camera.getPicture(onSuccessPositioning, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
    });
}

function onSuccessPositioning(imageData) {
    var positioningImage = $("#positioning-image");
    var patientID = $('#patientID').val();
    image = 'data:image/jpeg;base64,' + imageData;
    var imagedate = moment().format('DD-MM-YYYY');
    
    // positioningImage.append('<div class="swiper-slide test"><a href="#" class="openPhoto"><img class="photo" src="' + image + '"></a></div>');
    positioningImage.append('<div class="swiper-slide"><p class="sliderDate">' + imagedate + '</p><a href="#" class="openPhoto"><img class="photo" src="' + image + '" alt="'+imagedate+'"></a></div>');

    var addImage = 'addImage';
    var table = 'positioningimages';
    var imagerow = 'positioningimage';
  $$.post(connection, {"addImage": addImage, "imageData":image, "patientID":patientID,"table":table,"imagerow":imagerow}, function (data) {
        var result = JSON.parse(data);
        console.log(result);
        // if(result === "success"){

        //   console.log('success');
        // } else{
        //     myApp.alert('Sorry, something went wrong, try again');
        // }
    });
}

function getPhotoPositioning() {
    //Specify the source to get the photos.
    navigator.camera.getPicture(onSuccessPositioning, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM
    });
}

$$('.addPositioningImage').on('click', function() {
    var buttons = [{
        text: 'From photo library',
        onClick: function() {
            getPhotoPositioning();
        }
    }, {
        text: 'From Camera',
        onClick: function() {
            snapPicturePositioning();
        }
    }, {
        text: 'Cancel',
        color: 'red',
        onClick: function() {
        }
    }, ];
    myApp.actions(buttons);
});
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
            $$('.loading').show();

        ft.upload(path, connectionVideo, winPositioning, fail, options);

    });

}

function winPositioning(r) {
            $$('.loading').hide();

    var result = JSON.parse(r.response);

    var positioningVideo = $("#positioning-video");

    var videodate = moment().format('DD-MM-YYYY');
    for (var i = 0; i < result.length; i++) {
                var video = result[0];
                var videotitle = result[1];
    }
    positioningVideo.append('<div class="swiper-slide"><p class="videoTitle">'+videotitle+'</p><p class="sliderDate">'+videodate+'</p><a href="#" class="openVideo"><video poster="img/poster.jpg"><source type="video/mp4" src="' + video + '"></video></a></div>');
}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}

function snapPictureProcess() {
    navigator.camera.getPicture(onSuccessProcess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
    });
}

function onSuccessProcess(imageData) {
    var processImage = $("#process-image");
    var patientID = $('#patientID').val();
    image = 'data:image/jpeg;base64,' + imageData;
    var imagedate = moment().format('DD-MM-YYYY');
    // processImage.append('<div class="swiper-slide test"><a href="#" class="openPhoto"><img class="photo" src="' + image + '"></a></div>');
    processImage.append('<div class="swiper-slide"><p class="sliderDate">' + imagedate + '</p><a href="#" class="openPhoto"><img class="photo" src="' + image + '" alt="'+imagedate+'"></a></div>');

    var addImage = 'addImage';
    var table = 'processimages';
    var imagerow = 'processimage';
    $$.post(connection, {"addImage": addImage, "imageData":image, "patientID":patientID,"table":table,"imagerow":imagerow}, function (data) {
        var result = JSON.parse(data);
        console.log(result);
        // if(result === "success"){

        //   console.log('success');
        // } else{
        //     myApp.alert('Sorry, something went wrong, try again');
        // }
    });
}

function getPhotoProcess() {
    //Specify the source to get the photos.
    navigator.camera.getPicture(onSuccessProcess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM
    });
}

$$('.addProcessImage').on('click', function() {
    var buttons = [{
        text: 'From photo library',
        onClick: function() {
            getPhotoProcess();
        }
    }, {
        text: 'From Camera',
        onClick: function() {
            snapPictureProcess();
        }
    }, {
        text: 'Cancel',
        color: 'red',
        onClick: function() {
        }
    }, ];
    myApp.actions(buttons);
});
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
    processVideo.append('<div class="swiper-slide"><p class="videoTitle">'+videotitle+'</p><p class="sliderDate">'+videodate+'</p><a href="#" class="openVideo"><video poster="img/poster.jpg"><source type="video/mp4" src="' + video + '"></video></a></div>');
    // console.log(r.response);
    // processVideo.append('<div class="swiper-slide"><a href="#" class="openVideo"><video poster="img/poster.jpg"><source type="video/mp4" src="' + r.response + '"></video></a></div>');

}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}

function snapPictureTransfers() {
    navigator.camera.getPicture(onSuccessTransfers, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
    });
}

function onSuccessTransfers(imageData) {
    var transferImage = $("#transfers-image");
    var patientID = $('#patientID').val();
    image = 'data:image/jpeg;base64,' + imageData;
    var imagedate = moment().format('DD-MM-YYYY');

    // transferImage.append('<div class="swiper-slide test"><a href="#" class="openPhoto"><img class="photo" src="' + image + '"></a></div>');
    transferImage.append('<div class="swiper-slide test"><p class="sliderDate">' + imagedate + '</p><a href="#" class="openPhoto"><img class="photo" src="' + image + '" alt="'+imagedate+'"></a></div>');

    var addImage = 'addImage';
    var table = 'transferimages'
    var imagerow = 'transferimage'
    $$.post(connection, {"addImage": addImage, "imageData":image, "patientID":patientID,"table":table,"imagerow":imagerow}, function (data) {
        var result = JSON.parse(data);
        console.log(result);
        // if(result === "success"){

        //   console.log('success');
        // } else{
        //     myApp.alert('Sorry, something went wrong, try again');
        // }
    });
}

function getPhotoTransfers() {
    //Specify the source to get the photos.
    navigator.camera.getPicture(onSuccessTransfers, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM
    });
}

$$('.addTransfersImage').on('click', function() {
    var buttons = [{
        text: 'From photo library',
        onClick: function() {
            getPhotoTransfers();
        }
    }, {
        text: 'From Camera',
        onClick: function() {
            snapPictureTransfers();
        }
    }, {
        text: 'Cancel',
        color: 'red',
        onClick: function() {
        }
    }, ];
    myApp.actions(buttons);
});
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

    // var params = {};
    // params.transfer = "transfer";
    // params.id = $('#patientID').val();

    // options.params = params;
    // var ft = new FileTransfer(),
    //     path = mediaFile.fullPath,
    //     name = mediaFile.name;
    // ft.upload(path, 'http://169.254.136.152/uploadvideo.php', winTransfer, fail, options);

    myApp.prompt('Giv videon en title', 'Video title', function(value) {

        var options = new FileUploadOptions();

        var params = {};
        params.process = "transfer";
        params.id = $('#patientID').val();
        params.videotitle = value;

        options.params = params;
        var ft = new FileTransfer(),
            path = mediaFile.fullPath,
            name = mediaFile.name;
            $$('.loading').show();
        ft.upload(path, connectionVideo, winTransfer, fail, options);
    });
}

function winTransfer(r) {
    $$('.loading').hide();
    var result = JSON.parse(r.response);

    var transfersVideo = $("#transfers-video");

    var videodate = moment().format('DD-MM-YYYY');
    for (var i = 0; i < result.length; i++) {
                var video = result[0];
                var videotitle = result[1];
    }
    transfersVideo.append('<div class="swiper-slide"><p class="videoTitle">'+videotitle+'</p><p class="sliderDate">'+videodate+'</p><a href="#" class="openVideo"><video poster="img/poster.jpg"><source type="video/mp4" src="' + video + '"></video></a></div>');


}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}

$$(document).on("click", ".getAll", function() {
    $$('.loading').show();
    var type = this.id;

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
                    '<a id="' + roomnr + '" href="left-page-2.html" class="item-link getPatientList">' +
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
        $$('.loading').hide();
    });
});

var lastID = localStorage.getItem("lastPatient")

function patientInfo(whereistheidfrom, newid) {
    var patientInfo = "patientInfo";
    var id = whereistheidfrom;
    $('#patientID').val('');
    if (id == 'stored') {
        $('#patientID').val(lastID);
        var getInfo = lastID;
    }
    if (id == 'new') {
        $('#patientID').val(newid);
        var getInfo = newid;
        localStorage.setItem("lastPatient", newid);
    }
    $$.post(connection, {
        "patientInfo": patientInfo,
        'id': getInfo
    }, function(data) {
        var result = JSON.parse(data);
        for (var i = 0; i < result.length; i++) {
            var name = result[i].fullname;
            var profileimage = result[i].profileimage;
            var infotext = result[i].infotext;

            var born = result[i].born;
            var bornDate = moment(born).format('DD-MM-YYYY');

            var inlaid = result[i].inlaid;
            var inlaidDate = moment(inlaid).format('DD-MM-YYYY');
            var inlaidWeek = moment(inlaid).week();

            profileImage.append('<img src="' + profileimage + '" alt="' + name + '">');
            patientName.text(name);
            patientBorn.text('Født: ' + bornDate);
            patientinlaid.text('Indlagt: ' + inlaidDate + ' (Uge: ' + inlaidWeek + ')');
            patientText.text(infotext);
        }
    });

};

function getImages(id, type) {
    var type = type;
    $$.post(connection, {
        "type": type,
        'id': id
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no images');
        } else {
            if (type == 'processimages') {
                for (var i = 0; i < result.length; i++) {
                    var image = result[i].processimage;
                    var imagedate = result[i].processimagedate;
                    processImage.append('<div class="swiper-slide"><p class="sliderDate">' + imagedate + '</p><a href="#" class="openPhoto"><img class="photo" src="' + image + '" alt="'+imagedate+'"></a></div>');
                }
            }
            if (type == 'transferimages') {
                for (var i = 0; i < result.length; i++) {
                    var image = result[i].transferimage;
                    var imagedate = result[i].transferimagedate;
                    transfersImage.append('<div class="swiper-slide test"><p class="sliderDate">' + imagedate + '</p><a href="#" class="openPhoto"><img class="photo" src="' + image + '" alt="'+imagedate+'"></a></div>');
                }
            }
            if (type == 'positioningimages') {
                for (var i = 0; i < result.length; i++) {
                    var image = result[i].positioningimage;
                    var imagedate = result[i].positioningimagedate;
                    positioningImage.append('<div class="swiper-slide"><p class="sliderDate">' + imagedate + '</p><a href="#" class="openPhoto"><img class="photo" src="' + image + '" alt="'+imagedate+'"></a></div>');
                }
            }
        }
    });
};

function getNotes(id, type) {
    var type = type;
    $$.post(connection, {
        "type": type,
        'id': id
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no notes');
        } else {
            if (type == 'processnotes') {
                for (var i = 0; i < result.length; i++) {
                    var note = result[i].processnote;
                    var notedate = result[i].processnotedate;
                    processNotes.append('<div class="swiper-slide test"><p class="sliderDate">' + notedate + '</p><p class="sliderNote">' + note + '</p></div>');
                }
            }
            if (type == 'transfernotes') {
                for (var i = 0; i < result.length; i++) {
                    var note = result[i].transfernote;
                    var notedate = result[i].transfernotedate;
                    transfersNotes.append('<div class="swiper-slide test"><p class="sliderDate">' + notedate + '</p><p class="sliderNote">' + note + '</p></div>');
                }
            }
            if (type == 'positioningnotes') {
                for (var i = 0; i < result.length; i++) {
                    var note = result[i].positioningnote;
                    var notedate = result[i].positioningnotedate;
                    positioningNotes.append('<div class="swiper-slide test"><p class="sliderDate">' + notedate + '</p><p class="sliderNote">' + note + '</p></div>');
                }
            }
        }
    });
};

function getVideos(id, type) {
        var type = type;
        $$.post(connection, {
            "type": type,
            'id': id
        }, function(data) {
            var result = JSON.parse(data);
            if (result == '') {
                console.log('no videos');
            } else {
                if (type == 'processvideos') {
                    for (var i = 0; i < result.length; i++) {
                        var video = result[i].processvideo;
                        var videodate = result[i].processvideodate;
                        var videotitle = result[i].processvideotitle;
                        processVideo.append('<div class="swiper-slide"><p class="videoTitle">' + videotitle + '</p><p class="sliderDate">' + videodate + '</p><a href="#" class="openVideo"><video controls poster="img/poster.jpg"><source data-id="'+videodate+'" type="video/mp4" src="' + video + '"></video></a></div>');
                    }
                }
                if (type == 'transfervideos') {
                    for (var i = 0; i < result.length; i++) {
                        var video = result[i].transfervideo;
                        var videodate = result[i].transfervideodate;
                        var videotitle = result[i].transfervideotitle;
                        transfersVideo.append('<div class="swiper-slide"><p class="videoTitle">' + videotitle + '</p><p class="sliderDate">' + videodate + '</p><a href="#" class="openVideo"><video controls poster="img/poster.jpg"><source data-id="'+videodate+'" type="video/mp4" src="' + video + '"></video></a></div>');
                    }
                }
                if (type == 'positioningvideos') {
                    for (var i = 0; i < result.length; i++) {
                        var video = result[i].positioningvideo;
                        var videodate = result[i].positioningvideodate;
                        var videotitle = result[i].positioningvideotitle;
                        positioningVideo.append('<div class="swiper-slide"><p class="videoTitle">' + videotitle + '</p><p class="sliderDate">' + videodate + '</p><a href="#" class="openVideo"><video controls poster="img/poster.jpg"><source data-id="'+videodate+'" type="video/mp4" src="' + video + '"></video></a></div>');
                    }
                }
            }
        });
    };

$$(document).on("click", ".getPatientInfo", function() {
    $$('.loading').show();
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
    $$('.loading').hide();
});

//Load last patient

if (lastID === null) {
    console.log('its empty');
} else {
    $$('.loading').show();
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
    $$('.loading').hide();
}

$$(document).on("click", ".getPatientList", function() {
    $$('.loading').show();

    var roomnr = this.id;
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
        $$('.loading').hide();
    });
});

$$(document).on("click", ".openPhoto", function() {
    var arr = [];
    var img = $(this).parent().parent().parent().find("img"),
        len = img.length;
    if (len > 0) {

        img.each(function() {
            arr.push({
                url: $(this).attr("src"),
                caption: $(this).attr("alt")
            });

        });
    }

    var myPhotoBrowserDark = myApp.photoBrowser({
        photos: arr,
        theme: 'dark'
    });

    theImage = $(this).find('img').attr('src');
    for (var i = 0; i < img.length; i++) {

        if (img[i].src == theImage) {
            var theImageNr = i;
            myPhotoBrowserDark.open(theImageNr);
        }
    }

});

$$(document).on("click", ".openVideo", function() {
    var video = $(this).parent().parent().parent().find("source");
    var arr = [];

    video.each(function(i) {
        arr.push({
            html: '<video controls class="videoPlay" src="' + $(this).attr("src") + '"></video>',
            caption: '' + $(this).attr("data-id")
        });
    });

    var myVideoBrowserDark = myApp.photoBrowser({
        photos: arr,
        theme: 'dark',
        onClose: function() {
            $('.videoPlay')[0].pause();
        }
    });

    theVideo = $(this).find('source').attr('src');

    for (var i = 0; i < video.length; i++) {

        if (video[i].src == theVideo) {
            var theVideoNr = i;
            myVideoBrowserDark.open(theVideoNr);
        }
    }
    // $('.videoPlay')[0].play;
});

$$(document).on("click", ".team", function() {
  $$('.loading').show();
    var teamnr = this.id;
    var roomdata = "roomdata";
    $$.post(connection, {"roomdata": roomdata, 'teamnr' : teamnr}, function (data) {
        var result = JSON.parse(data);
        for (var i = 0; i < result.length; i++) {
            var roomnr = result[i].roomnr;
            $('.roomData').append('<li>'+
            '<a id="'+roomnr+'" href="left-page-2.html" class="item-link getPatientList">'+
              '<div class="item-content">'+
                '<div class="item-inner">'+
                  '<div class="item-title">Stue '+roomnr+'</div>'+
                '</div>'+
              '</div>'+
            '</a>'+
          '</li>'
          );
        }
        $$('.loading').hide();
    });
});
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
                console.log(html);
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
    $$(".tabs-menu a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(".tab-content").not(tab).addClass('hide');
        $(tab).removeClass('hide');

    });

//# sourceMappingURL=site.js.map