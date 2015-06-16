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
