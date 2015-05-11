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