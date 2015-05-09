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

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    window.alert('Loading PhoneGap is completed');
}

function snapPicture() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
    });

}

function onSuccess(imageData) {
    var profileImage = $("#profileImage");
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

function onFail(message) {
    alert('An error occured: ' + message);
}
$$('.chooseImage').on('click', function() {
    var buttons = [{
        text: 'From photo library',
        onClick: function() {
            // myApp.alert('Button1 clicked');
            getPhoto();
        }
    }, {
        text: 'From Camera',
        onClick: function() {
            // myApp.alert('Button2 clicked');
            snapPicture();
        }
    }, {
        text: 'Cancel',
        color: 'red',
        onClick: function() {
            // myApp.alert('Cancel clicked');
        }
    }, ];
    myApp.actions(buttons);
});
