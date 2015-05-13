function snapPicture() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
    });
}

function onSuccess(imageData) {
    var profileImage = $(".profileImage");
    profileImage.empty();
    image = 'data:image/jpeg;base64,' + imageData;
    profileImage.append('<img src="' + image + '" alt="' + name + '">');
}

function getPhoto() {
    //Specify the source to get the photos.
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
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
        onClick: function() {
        }
    }, ];
    myApp.actions(buttons);
});

$$('.addPatient').on('click', function(){
var addPatient = 'addPatient';
var imageSrc = $('.profileImage img').attr('src');
var fullname = $('input[name="fullname"]').val();
var born = $('input[name="born"]').val();
var inlaid = $('input[name="inlaid"]').val();
var roomnr = $('select[name="roomnr"]').val();
var description = $('textarea[name="description"]').val();
  $.post("http://169.254.136.152/api.php", {"addPatient": addPatient, "fullname": fullname,"born": born,"inlaid":inlaid,"roomnr": roomnr,"description": description,"imageSrc": imageSrc}, function (data) {
        var result = JSON.parse(data);
        if(result === "success"){
            emptyPatientInfo();

            profileImage.append('<img src="' + imageSrc + '" alt="' + fullname + '">');
            patientName.text(fullname);
            patientBorn.text('Født: ' + born);
            patientinlaid.text('Indlagt: ' +inlaid);
            patientText.text(description);
            myApp.closeModal('.popup');

            $('.profileImage').empty();
            $('input[name="fullname"]').val('');
            $('input[name="born"]').val('');
            $('input[name="inlaid"]').val('');
            $('select[name="roomnr"]').val('');
            $('textarea[name="description"]').val('');

        } else{
            myApp.alert('Sorry, something went wrong, try again '+result);
        }
    });
}); 