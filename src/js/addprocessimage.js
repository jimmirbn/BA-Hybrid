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
    var imagedate = moment().format('LLL');
    var totalDivs;
    var countDivs = $('#process-image .swiper-slide').length;
    if (countDivs == 0) {
        var totalDivs = 0;
    } else {
        var totalDivs = countDivs + 1;
    }

    ProcessArr.push({
        url: image,
        caption: imagedate
    });
    // processImage.append('<div class="swiper-slide test"><a href="#" class="openPhoto"><img class="photo" src="' + image + '"></a></div>');
    processImage.append('<div class="swiper-slide"><p class="sliderDate">' + imagedate + '</p><a id="' + totalDivs + '" href="#" class="openPhoto openProcessPhoto"><img class="photo" src="' + image + '" alt="' + imagedate + '"></a></div>');

    var addImage = 'addImage';
    var table = 'processimages';
    var imagerow = 'processimage';
    $$.post(connection, {
        "addImage": addImage,
        "imageData": image,
        "patientID": patientID,
        "table": table,
        "imagerow": imagerow
    }, function(data) {
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
