function snapPicturePositioning() {
    navigator.camera.getPicture(onSuccessPositioning, onFail, {
        quality: 50,
        targetWidth: 1280,
        targetHeight: 960,
        destinationType: Camera.DestinationType.DATA_URL
    });
}

function onSuccessPositioning(imageData) {
    var positioningImage = $("#positioning-image");
    var patientID = $('#patientID').val();
    image = 'data:image/jpeg;base64,' + imageData;
    var imagedate = moment().format('DD-MM-YYYY, H:mm');
    var totalDivs;
    var countDivs = $('#positioning-image .swiper-slide').length;
    if (countDivs == 0) {
        var totalDivs = 0;
        positioningImage.empty();
    } else {
        var totalDivs = countDivs;
    }

    var positioningimagesDivs = $('.openPositioningPhoto');
    var positioningimagesDelete = $('#positioning-image .deleteContent');


    $.each(positioningimagesDivs, function() {
        var id = this.id;
        var oldId = parseInt(id);
        $(this).attr('id',oldId+1);
    });

    $.each(positioningimagesDelete, function() {
        var id = $(this).attr('data-index');
        var oldId = parseInt(id);
        $(this).attr('data-index', oldId + 1);
    });

    PositioningArr.unshift({
        url: image,
        caption: imagedate
    });
    var addImage = 'addImage';
    var table = 'positioningimages';
    var imagerow = 'positioningimage';
    $$.post(connection, {
        "addImage": addImage,
        "imageData": image,
        "patientID": patientID,
        "table": table,
        "imagerow": imagerow,
        "date": imagedate
    }, function(data) {
        var result = JSON.parse(data);
        console.log(result);
        mySwiper7.prependSlide('<div class="swiper-slide"><a data-array="PositioningArr" data-index="0" data-id="' + table + '" id="' + result + '" class="deleteContent">X</a><p class="sliderDate">' + imagedate + '</p><a id="0" href="#" class="openPhoto openPositioningPhoto"><img class="photo" src="' + image + '" alt="' + imagedate + '"></a></div>');
    });

    var dots = positioningImage.siblings()[0];
    $$(dots).show();
    // positioningImage.append('<div class="swiper-slide"><p class="sliderDate">' + imagedate + '</p><a id="' + totalDivs + '" href="#" class="openPhoto openPositioningPhoto"><img class="photo" src="' + image + '" alt="' + imagedate + '"></a></div>');
    mySwiper7.slideTo(0);
}

function getPhotoPositioning() {
    //Specify the source to get the photos.
    navigator.camera.getPicture(onSuccessPositioning, onFail, {
        quality: 50,
        targetWidth: 1280,
        targetHeight: 960,
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
        onClick: function() {}
    }, ];
    myApp.actions(buttons);
});
