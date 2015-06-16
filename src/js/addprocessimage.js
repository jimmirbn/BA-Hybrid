function snapPictureProcess() {
    navigator.camera.getPicture(onSuccessProcess, onFail, {
        quality: 50,
        targetWidth: 1280,
        targetHeight: 960,
        destinationType: Camera.DestinationType.DATA_URL
    });
}

function onSuccessProcess(imageData) {

    myApp.modal({
        title: 'Skriv evt info til billedet',
        text: '<textarea name="processImageInfo" placeholder="Tryk her for at skrive"></textarea>',
        buttons: [{
            text: 'Ok',
            onClick: function() {
                var learningInfo = $('textarea[name="processImageInfo"]').val();
                var processImage = $("#process-image");
                var patientID = $('#patientID').val();
                image = 'data:image/jpeg;base64,' + imageData;
                var imagedate = moment().format('DD-MM-YYYY, H:mm');
                var totalDivs;
                var countDivs = $('#process-image .swiper-slide').length;
                if (countDivs == 0) {
                    var totalDivs = 0;
                    processImage.empty();
                } else {
                    var totalDivs = countDivs;
                };

                var processimagesDivs = $('.openProcessPhoto');
                var processimagesDelete = $('#process-image .deleteContent');

                $.each(processimagesDivs, function() {
                    var id = this.id;
                    var oldId = parseInt(id);
                    $(this).attr('id', oldId + 1);
                });
                $.each(processimagesDelete, function() {
                    var id = $(this).attr('data-index');
                    var oldId = parseInt(id);
                    $(this).attr('data-index', oldId + 1);
                });

                ProcessArr.unshift({
                    url: image,
                    caption: imagedate+"<br>"+learningInfo
                });
                var addImage = 'addImage';
                var table = 'processimages';
                var imagerow = 'processimage';
                $$.post(connection, {
                    "addImage": addImage,
                    "imageData": image,
                    "patientID": patientID,
                    "table": table,
                    "imagerow": imagerow,
                    "date": imagedate,
                    "info": learningInfo
                }, function(data) {
                    console.log(data);
                    var result = JSON.parse(data);
                    mySwiper1.prependSlide('<div class="swiper-slide"><a data-array="ProcessArr" data-index="0" data-id="' + table + '" id="' + result + '" class="deleteContent">X</a><p class="sliderDate">' + imagedate + '</p><a id="0" href="#" class="openPhoto openProcessPhoto"><img class="photo" src="' + image + '" alt="' + imagedate + '"></a></div>')
                });
                var dots1 = processImage.siblings()[0];
                $$(dots1).show();

                mySwiper1.slideTo(0);

            }
        }, {
            text: 'Afbryd',
            onClick: function() {
                myApp.alert('Billedet er slettet!')
            }
        }]
    });
}

function getPhotoProcess() {
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
