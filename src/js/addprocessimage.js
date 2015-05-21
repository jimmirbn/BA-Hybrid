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
    var imagedate = moment().format('DD-MM-YYYY, H:mm');
    var totalDivs;
    var countDivs = $('#process-image .swiper-slide').length;
    if (countDivs == 0) {
        var totalDivs = 0;
    } else {
        var totalDivs = countDivs;
    };

    var processimagesDivs = $('.openProcessPhoto');

    $.each(processimagesDivs, function() {
        var id = this.id;
        var oldId = parseInt(id);
        $(this).attr('id',oldId+1);
    });

    ProcessArr.unshift({
        url: image,
        caption: imagedate
    });
    
    var dots1 = processImage.siblings()[0];
    $$(dots1).show();
    mySwiper1.prependSlide('<div class="swiper-slide"><p class="sliderDate">' + imagedate + '</p><a id="0" href="#" class="openPhoto openProcessPhoto"><img class="photo" src="' + image + '" alt="' + imagedate + '"></a></div>')

    // processImage.prepend('<div class="swiper-slide"><p class="sliderDate">' + imagedate + '</p><a id="' + totalDivs + '" href="#" class="openPhoto openProcessPhoto"><img class="photo" src="' + image + '" alt="' + imagedate + '"></a></div>');
    mySwiper1.slideTo(0);
    var addImage = 'addImage';
    var table = 'processimages';
    var imagerow = 'processimage';
    $$.post(connection, {
        "addImage": addImage,
        "imageData": image,
        "patientID": patientID,
        "table": table,
        "imagerow": imagerow,
        "date": imagedate
    }, function(data) {
        console.log(data);
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
