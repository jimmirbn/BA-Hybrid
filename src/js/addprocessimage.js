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

    var addImage = 'addImage';
    var table = 'processimages';
    var imagerow = 'processimage';
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