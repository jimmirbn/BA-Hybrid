// Initialize your app
var myApp = new Framework7();

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

}

var profileImage = $("#profileImage");
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
var type = 'addPatient';
var imageSrc = $('.profileImage img').attr('src');
var fullname = $('input[name="fullname"]').val();
var born = $('input[name="born"]').val();
var inlaid = $('input[name="inlaid"]').val();
var roomnr = $('select[name="roomnr"]').val();
var description = $('textarea[name="description"]').val();
  $.post("http://www.digitaljimmi.com/api.php", {"type": type, "fullname": fullname,"born": born,"inlaid":inlaid,"roomnr": roomnr,"description": description,"imageSrc": imageSrc}, function (data) {
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
            myApp.alert('Sorry, something went wrong, try again');
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
    // profileImage.append('<img src="' + image + '" alt="' + name + '">');
    positioningImage.append('<div class="swiper-slide test"><a href="#" class="openPhoto"><img class="photo" src="' + image + '"></a></div>');

    var type = 'addImage';
    var table = 'positioningimages';
    var imagerow = 'positioningimage';
  $.post("http://www.digitaljimmi.com/api.php", {"type": type, "imageData":image, "patientID":patientID,"table":table,"imagerow":imagerow}, function (data) {
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
    var options = new FileUploadOptions();

    var params = {};
    params.type = "positioning";
    params.id = $('#patientID').val();

    options.params = params;
    var ft = new FileTransfer(),
        path = mediaFile.fullPath,
        name = mediaFile.name;
    ft.upload(path, 'http://www.digitaljimmi.com/uploadvideo.php', winPositioning, fail, options);

}

function winPositioning(r) {
    var positioningVideo = $("#positioning-video");
    positioningVideo.append('<div class="swiper-slide"><a href="#" class="openVideo"><video poster="img/poster.jpg"><source type="video/mp4" src="' + r.response + '"></video></a></div>');
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
    // profileImage.append('<img src="' + image + '" alt="' + name + '">');
    processImage.append('<div class="swiper-slide test"><a href="#" class="openPhoto"><img class="photo" src="' + image + '"></a></div>');

    var type = 'addImage';
    var table = 'processimages';
    var imagerow = 'processimage';
  $.post("http://www.digitaljimmi.com/api.php", {"type": type, "imageData":image, "patientID":patientID,"table":table,"imagerow":imagerow}, function (data) {
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
        params.type = "process";
        params.id = $('#patientID').val();
        params.videotitle = value;

        options.params = params;
        var ft = new FileTransfer(),
            path = mediaFile.fullPath,
            name = mediaFile.name;
        ft.upload(path, 'http://www.digitaljimmi.com/uploadvideo.php', winProcess, fail, options);

    });
}

function winProcess(r) {
    console.log(r.response);
    var processVideo = $("#process-video");
    processVideo.append('<div class="swiper-slide"><a href="#" class="openVideo"><video poster="img/poster.jpg"><source type="video/mp4" src="' + r.response + '"></video></a></div>');

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
    // profileImage.append('<img src="' + image + '" alt="' + name + '">');
    transferImage.append('<div class="swiper-slide test"><a href="#" class="openPhoto"><img class="photo" src="' + image + '"></a></div>');

    var type = 'addImage';
    var table = 'transferimages'
    var imagerow = 'transferimage'
  $.post("http://www.digitaljimmi.com/api.php", {"type": type, "imageData":image, "patientID":patientID,"table":table,"imagerow":imagerow}, function (data) {
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

$(document).on("click", ".openPhoto", function() {
	var photo = $(this).find('img').attr('src');

	var myPhotoBrowserDark = myApp.photoBrowser({
		photos : [
		''+photo+'',
		],
		theme: 'dark'
	});

	myPhotoBrowserDark.open();
});

$(document).on("click", ".openVideo", function() {
	var video = $(this).find('source').attr('src');
	var myVideoBrowserDark = myApp.photoBrowser({
		photos : [
		'<video controls class="videoPlay" src='+video+'></video>',
		],
		theme: 'dark',
		toolbar: false, // måske
		onClose: function () {
			$('.videoPlay')[0].pause();
		}
	});
	myVideoBrowserDark.open();
	$('.videoPlay')[0].play();

});
$$(document).on("click", ".getPatientInfo", function() {
    var patientID = this.id;
    var type = "patientInfo";
    emptyPatientInfo();
    $('#patientID').val('');
    $('#patientID').val(patientID);
    localStorage.setItem("lastPatient", patientID);
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": type,
        'id': patientID
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
//PROCESS START
    var processimages = 'getprocessimages';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": processimages,
        'id': patientID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no process images');
        } else {
            for (var i = 0; i < result.length; i++) {
                var image = result[i].processimage;
                var imagedate = result[i].processimagedate;
                processImage.append('<div class="swiper-slide"><p class="sliderDate">'+imagedate+'</p><a href="#" class="openPhoto"><img class="photo" src="' + image + '"></a></div>');
            }
        }
    });

    var processnotes = 'getprocessnotes';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": processnotes,
        'id': patientID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no process notes');
        } else {
            for (var i = 0; i < result.length; i++) {
                var note = result[i].processnote;
                var notedate = result[i].processnotedate;
                processNotes.append('<div class="swiper-slide test"><p class="sliderDate">'+notedate+'</p><p class="sliderNote">'+note+'</p></div>');
            }
        }
    });

    var processvideos = 'getprocessvideos';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": processvideos,
        'id': patientID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no process videos');
        } else {
            for (var i = 0; i < result.length; i++) {
                var video = result[i].processvideo;
                var videodate = result[i].processvideodate;
                var videotitle = result[i].processvideotitle;
                processVideo.append('<div class="swiper-slide"><p class="videoTitle">'+videotitle+'</p><p class="sliderDate">'+videodate+'</p><a href="#" class="openVideo"><video poster="img/poster.jpg"><source type="video/mp4" src="' + video + '"></video></a></div>');
                
            }
        }
    });
    //PROCESS END
    // TRANSFER START
    var transferimages = 'gettransferimages';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": transferimages,
        'id': patientID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no transfer images');
        } else {
            for (var i = 0; i < result.length; i++) {
                var image = result[i].transferimage;
                var imagedate = result[i].transferimagedate;
                transfersImage.append('<div class="swiper-slide test"><p class="sliderDate">'+imagedate+'</p><a href="#" class="openPhoto"><img class="photo" src="' + image + '"></a></div>');
            }
        }
    });

    var transfernotes = 'gettransfernotes';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": transfernotes,
        'id': patientID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no transfer notes');
        } else {
            for (var i = 0; i < result.length; i++) {
                var note = result[i].transfernote;
                var notedate = result[i].transfernotedate;
                transfersNotes.append('<div class="swiper-slide test"><p class="sliderDate">'+notedate+'</p><p class="sliderNote">'+note+'</p></div>');
            }
        }
    });

    var transfervideos = 'gettransfervideos';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": transfervideos,
        'id': patientID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no transfer videos');
        } else {
            for (var i = 0; i < result.length; i++) {
                var video = result[i].transfervideo;
                var videodate = result[i].transfervideodate;
                var videotitle = result[i].transfervideotitle;
                transfersVideo.append('<div class="swiper-slide"><p class="videoTitle">'+videotitle+'</p><p class="sliderDate">'+videodate+'</p><a href="#" class="openVideo"><video poster="img/poster.jpg"><source type="video/mp4" src="' + video + '"></video></a></div>');  
            }
        }
    });
// TRANSFER END

// positioning START
    var positioningimages = 'getpositioningimages';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": positioningimages,
        'id': patientID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no positioning images');
        } else {
            for (var i = 0; i < result.length; i++) {
                var image = result[i].positioningimage;
                var imagedate = result[i].positioningimagedate;
                positioningImage.append('<div class="swiper-slide"><p class="sliderDate">'+imagedate+'</p><a href="#" class="openPhoto"><img class="photo" src="' + image + '"></a></div>');
            }
        }
    });

    var positioningnotes = 'getpositioningnotes';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": positioningnotes,
        'id': patientID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no positioning notes');
        } else {
            for (var i = 0; i < result.length; i++) {
                var note = result[i].positioningnote;
                var notedate = result[i].positioningnotedate;
                positioningNotes.append('<div class="swiper-slide test"><p class="sliderDate">'+notedate+'</p><p class="sliderNote">'+note+'</p></div>');
            }
        }
    });

    var positioningvideos = 'getpositioningvideos';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": positioningvideos,
        'id': patientID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no positioning videos');
        } else {
            for (var i = 0; i < result.length; i++) {
                var video = result[i].positioningvideo;
                var videodate = result[i].positioningvideodate;
                var videotitle = result[i].positioningvideotitle;
                positioningVideo.append('<div class="swiper-slide"><p class="videoTitle">'+videotitle+'</p><p class="sliderDate">'+videodate+'</p><a href="#" class="openVideo"><video poster="img/poster.jpg"><source type="video/mp4" src="' + video + '"></video></a></div>');
                
            }
        }
    });
// positioning END
});

//Load last patient
var lastID = localStorage.getItem("lastPatient")
if (lastID === null) {

    console.log('its empty');
} else {
    emptyPatientInfo();
    var type = "patientInfo";
    $('#patientID').val('');
    $('#patientID').val(lastID);
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": type,
        'id': lastID
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
// PROCESS START
    var processimages = 'getprocessimages';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": processimages,
        'id': lastID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no process images');
        } else {
            for (var i = 0; i < result.length; i++) {
                var image = result[i].processimage;
                var imagedate = result[i].processimagedate;
                processImage.append('<div class="swiper-slide"><p class="sliderDate">'+imagedate+'</p><a href="#" class="openPhoto"><img class="photo" src="' + image + '"></a></div>');
            }
        }
    });

    var processnotes = 'getprocessnotes';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": processnotes,
        'id': lastID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no process notes');
        } else {
            for (var i = 0; i < result.length; i++) {
                var note = result[i].processnote;
                var notedate = result[i].processnotedate;
                processNotes.append('<div class="swiper-slide test"><p class="sliderDate">'+notedate+'</p><p class="sliderNote">'+note+'</p></div>');
            }
        }
    });

    var processvideos = 'getprocessvideos';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": processvideos,
        'id': lastID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no process videos');
        } else {
            for (var i = 0; i < result.length; i++) {
                var video = result[i].processvideo;
                var videodate = result[i].processvideodate;
                var videotitle = result[i].processvideotitle;
                processVideo.append('<div class="swiper-slide"><p class="videoTitle">'+videotitle+'</p><p class="sliderDate">'+videodate+'</p><a href="#" class="openVideo"><video poster="img/poster.jpg"><source type="video/mp4" src="' + video + '"></video></a></div>');
                
            }
        }
    });

    // PROCESS END
    
    // TRANSFER START
    var transferimages = 'gettransferimages';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": transferimages,
        'id': lastID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no transfer images');
        } else {
            for (var i = 0; i < result.length; i++) {
                var image = result[i].transferimage;
                var imagedate = result[i].transferimagedate;
                transfersImage.append('<div class="swiper-slide test"><p class="sliderDate">'+imagedate+'</p><a href="#" class="openPhoto"><img class="photo" src="' + image + '"></a></div>');
            }
        }
    });

    var transfernotes = 'gettransfernotes';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": transfernotes,
        'id': lastID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no transfer notes');
        } else {
            for (var i = 0; i < result.length; i++) {
                var note = result[i].transfernote;
                var notedate = result[i].transfernotedate;
                transfersNotes.append('<div class="swiper-slide test"><p class="sliderDate">'+notedate+'</p><p class="sliderNote">'+note+'</p></div>');
            }
        }
    });

    var transfervideos = 'gettransfervideos';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": transfervideos,
        'id': lastID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no transfer videos');
        } else {
            for (var i = 0; i < result.length; i++) {
                var video = result[i].transfervideo;
                var videodate = result[i].transfervideodate;
                var videotitle = result[i].transfervideotitle;
                transfersVideo.append('<div class="swiper-slide"><p class="videoTitle">'+videotitle+'</p><p class="sliderDate">'+videodate+'</p><a href="#" class="openVideo"><video poster="img/poster.jpg"><source type="video/mp4" src="' + video + '"></video></a></div>');
                
            }
        }
    });
// TRANSFER END
    // positioning START
    var positioningimages = 'getpositioningimages';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": positioningimages,
        'id': lastID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no positioning images');
        } else {
            for (var i = 0; i < result.length; i++) {
                var image = result[i].positioningimage;
                var imagedate = result[i].positioningimagedate;
                positioningImage.append('<div class="swiper-slide"><p class="sliderDate">'+imagedate+'</p><a href="#" class="openPhoto"><img class="photo" src="' + image + '"></a></div>');
            }
        }
    });

    var positioningnotes = 'getpositioningnotes';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": positioningnotes,
        'id': lastID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no positioning notes');
        } else {
            for (var i = 0; i < result.length; i++) {
                var note = result[i].positioningnote;
                var notedate = result[i].positioningnotedate;
                positioningNotes.append('<div class="swiper-slide test"><p class="sliderDate">'+notedate+'</p><p class="sliderNote">'+note+'</p></div>');
            }
        }
    });

    var positioningvideos = 'getpositioningvideos';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": positioningvideos,
        'id': lastID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no positioning videos');
        } else {
            for (var i = 0; i < result.length; i++) {
                var video = result[i].positioningvideo;
                var videodate = result[i].positioningvideodate;
                var videotitle = result[i].positioningvideotitle;
                positioningVideo.append('<div class="swiper-slide"><p class="videoTitle">'+videotitle+'</p><p class="sliderDate">'+videodate+'</p><a href="#" class="openVideo"><video poster="img/poster.jpg"><source type="video/mp4" src="' + video + '"></video></a></div>');
                
            }
        }
    });
// positioning END
}

$(document).on("click", ".getPatientList", function() {
    var roomnr = this.id;
    var type = "patientListData";
    $.post("http://www.digitaljimmi.com/api.php", {"type": type, 'roomnr' : roomnr}, function (data) {
        var result = JSON.parse(data);
        for (var i = 0; i < result.length; i++) {

            var name = result[i].fullname;
            var id = result[i].id;
            $('.patientList').append('<li>'+
            '<a id="'+id+'" href="" class="item-link getPatientInfo">'+
              '<div class="item-content">'+
                '<div class="item-inner">'+
                  '<div class="item-title">'+name+'</div>'+
                '</div>'+
              '</div>'+
            '</a>'+
          '</li>'
          );
        }
    });
});
$(document).on("click", ".team", function() {
    var teamnr = this.id;
    var type = "roomdata";
    $.post("http://www.digitaljimmi.com/api.php", {"type": type, 'teamnr' : teamnr}, function (data) {
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
    });
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
$(document).ready(function() {

    $(".tabs-menu a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(".tab-content").not(tab).addClass('hide');
        $(tab).removeClass('hide');

    });
});
//# sourceMappingURL=site.js.map