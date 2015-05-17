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
        onClick: function() {
        }
    }, ];
    myApp.actions(buttons);
});