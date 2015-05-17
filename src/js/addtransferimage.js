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
        onClick: function() {
        }
    }, ];
    myApp.actions(buttons);
});