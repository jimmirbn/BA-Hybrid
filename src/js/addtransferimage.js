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

    var addImage = 'addImage';
    var table = 'transferimages'
    var imagerow = 'transferimage'
    $.post("http://169.254.136.152/api.php", {"addImage": addImage, "imageData":image, "patientID":patientID,"table":table,"imagerow":imagerow}, function (data) {
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