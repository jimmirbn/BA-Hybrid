function snapPicture() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        targetWidth: 150,
        targetHeight: 200,
        destinationType: Camera.DestinationType.DATA_URL
    });

}

function onSuccess(imageData) {
    var profileImage = $(".profileImage");
    profileImage.empty();
    image = 'data:image/jpeg;base64,' + imageData;
    profileImage.append('<img src="' + image + '">');
}

function getPhoto() {
    //Specify the source to get the photos.
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        targetWidth: 150,
        targetHeight: 200,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM
    });
}

$$('.profileImage, .addProfileImage').on('click', function() {
    var buttons = [{
        text: 'From photo library',
        onClick: function() {
            getPhoto();
        }
    }, {
        text: 'From Camera',
        onClick: function() {
            snapPicture();
        }
    }, {
        text: 'Cancel',
        color: 'red',
        onClick: function() {}
    }, ];
    myApp.actions(buttons);
});

$$('.addPatient').on('click', function() {
    var addPatient = 'addPatient';
    var imageSrc = $('.profileImage img').attr('src');
    var fullname = $('input[name="fullname"]').val();
    var born = $('input[name="born"]').val();
    var inlaid = $('input[name="inlaid"]').val();
    var roomnr = $('select[name="roomnr"]').val();
    var description = $('textarea[name="description"]').val();
    $.post(connection, {
        "addPatient": addPatient,
        "fullname": fullname,
        "born": born,
        "inlaid": inlaid,
        "roomnr": roomnr,
        "description": description,
        "imageSrc": imageSrc
    }, function(data) {
        var result = JSON.parse(data);
        $$('.noPatient').hide();
        console.log(data);
        if (result != "error") {
            emptyPatientInfo();

            localStorage.setItem("lastPatient", result);
            btnDelete.attr('id',result);
            if (imageSrc != undefined) {
                profileImage.append('<img src="' + imageSrc + '" alt="' + fullname + '">');
            }
            patientName.text(fullname);
            patientBorn.text('Født: ' + born);
            patientinlaid.text('Indlagt: ' + inlaid);
            patientText.text(description);
            myApp.closeModal('.popup-addPatient');

            $('.profileImage').empty();
            $('input[name="fullname"]').val('');
            $('input[name="born"]').val('');
            $('input[name="inlaid"]').val('');
            $('select[name="roomnr"]').val('');
            $('textarea[name="description"]').val('');

            processImage.append('<div class="no-results"><p>Ingen process billeder</p></div>');
            var dots1 = processImage.siblings()[0];
            $$(dots1).hide();

            transfersImage.append('<div class="no-results"><p>Ingen billeder af flytninger</p></div>');
            var dots2 = transfersImage.siblings()[0];
            $$(dots2).hide();

            positioningImage.append('<div class="no-results"><p>Ingen billeder af lejringer</p></div>');
            var dots3 = positioningImage.siblings()[0];
            $$(dots3).hide();

            processNotes.append('<div class="no-results"><p>Ingen process noter</p></div>')
            var dots4 = processNotes.siblings()[0];
            $$(dots4).hide();

            transfersNotes.append('<div class="no-results"><p>Ingen forflytnings noter</p></div>')
            var dots5 = transfersNotes.siblings()[0];
            $$(dots5).hide();

            positioningNotes.append('<div class="no-results"><p>Ingen lejrings noter</p></div>')
            var dots6 = positioningNotes.siblings()[0];
            $$(dots6).hide();

            processVideo.append('<div class="no-results"><p>Ingen process videoer</p></div>')
            var dots7 = processVideo.siblings()[0];
            $$(dots7).hide();

            transfersVideo.append('<div class="no-results"><p>Ingen videoer af forflytninger</p></div>')
            var dots8 = transfersVideo.siblings()[0];
            $$(dots8).hide();

            positioningVideo.append('<div class="no-results"><p>Ingen videoer af lejring</p></div>')
            var dots9 = positioningVideo.siblings()[0];
            $$(dots9).hide();

        } else {
            myApp.alert('Sorry, something went wrong, try again ' + result);
        }
    });
});
