function snapPictureTransfers() {
    navigator.camera.getPicture(onSuccessTransfers, onFail, {
        quality: 50,
        targetWidth: 1280,
        targetHeight: 960,
        destinationType: Camera.DestinationType.DATA_URL
    });
}

function onSuccessTransfers(imageData) {

    myApp.modal({
        title: 'Skriv evt info til billedet',
        text: '<textarea name="processImageInfo" placeholder="Tryk her for at skrive"></textarea>',
        buttons: [{
            text: 'Ok',
            onClick: function() {
                var learningInfo = $('textarea[name="processImageInfo"]').val();

                var transfersImage = $("#transfers-image");
                var patientID = $('#patientID').val();
                image = 'data:image/jpeg;base64,' + imageData;
                var imagedate = moment().format('DD-MM-YYYY, H:mm');
                var totalDivs;
                var countDivs = $('#transfers-image .swiper-slide').length;
                if (countDivs == 0) {
                    var totalDivs = 0;
                    transfersImage.empty();
                } else {
                    var totalDivs = countDivs;
                }

                var transferimagesDivs = $('.openTransferPhoto');
                var transferimagesDelete = $('#transfers-image .deleteContent');


                $.each(transferimagesDivs, function() {
                    var id = this.id;
                    var oldId = parseInt(id);
                    $(this).attr('id', oldId + 1);
                });
                $.each(transferimagesDelete, function() {
                    var id = $(this).attr('data-index');
                    var oldId = parseInt(id);
                    $(this).attr('data-index', oldId + 1);
                });

                TransferArr.unshift({
                    url: image,
                    caption: imagedate+"<br>"+learningInfo
                });
                var addImage = 'addImage';
                var table = 'transferimages'
                var imagerow = 'transferimage'
                $$.post(connection, {
                    "addImage": addImage,
                    "imageData": image,
                    "patientID": patientID,
                    "table": table,
                    "imagerow": imagerow,
                    "date": imagedate,
                    "info":learningInfo
                }, function(data) {
                    var result = JSON.parse(data);
                    console.log(result);
                    mySwiper4.prependSlide('<div class="swiper-slide"><a data-array="TransferArr" data-index="0" data-id="' + table + '" id="' + result + '" class="deleteContent">X</a><p class="sliderDate">' + imagedate + '</p><a id="0" href="#" class="openPhoto openTransferPhoto"><img class="photo" src="' + image + '" alt="' + imagedate + '"></a></div>');
                });
                var dots = transfersImage.siblings()[0];
                $$(dots).show();
                mySwiper4.slideTo(0);

            }
        }, {
            text: 'Afbryd',
            onClick: function() {
                myApp.alert('Billedet er slettet!')
            }
        }]
    });
}

function getPhotoTransfers() {
    //Specify the source to get the photos.
    navigator.camera.getPicture(onSuccessTransfers, onFail, {
        quality: 50,
        targetWidth: 1280,
        targetHeight: 960,
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
        onClick: function() {}
    }, ];
    myApp.actions(buttons);
});
