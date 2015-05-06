var profileImage = $("#profileImage");
var patientName = $("#patientName");
var patientBorn = $("#patientBorn");
var patientinlaid = $("#patientinlaid");
var patientText = $("#patientText");

$(document).on("click", ".getPatientInfo", function() {
    var patientID = this.id;
    var type = "patientInfo";

    profileImage.empty();
    patientName.empty();
    patientBorn.empty();
    patientinlaid.empty();
    patientText.empty();

    localStorage.setItem("lastPatient", patientID);
    $.post("http://www.digitaljimmi.com/api.php", {"type": type, 'id': patientID}, function (data) {
        var result = JSON.parse(data);
        for (var i = 0; i < result.length; i++) {
            var name = result[i].fullname;
            var image = result[i].image;
            var infotext = result[i].infotext;

            var born = result[i].born;
            var bornDate = moment(born).format('DD-MM-YYYY');

            var inlaid = result[i].inlaid;
            var inlaidDate = moment(inlaid).format('DD-MM-YYYY');
            var inlaidWeek = moment(inlaid).week();

            profileImage.append('<img src="'+image+'" alt="'+name+'">'); 
            patientName.text(name); 
            patientBorn.text('Født: '+bornDate);
            patientinlaid.text('Indlagt: '+inlaidDate+' (Uge: '+inlaidWeek+')');
            patientText.text(infotext);
        }
    });

    var type2 = "patientlejring";
// var lastID = localStorage.getItem("lastPatient")

$.post("http://www.digitaljimmi.com/api.php", {"type": type2, 'id':patientID}, function (data) {
    var result = JSON.parse(data);
    for (var i = 0; i < result.length; i++) {
        var image = result[i].image;
        var imagedate = result[i].imagedate;
        var note = result[i].note;
        var notedate = result[i].notedate;
        var video = result[i].video;
        var videodate = result[i].videodate;

        $("#positioning-image").append('<div class="swiper-slide test"><a href="#" class="openPhoto"><img class="photo" src="'+image+'"></a></div>');
        $("#positioning-video").append('<a href="#" class="openVideo"><video><source type="video/mp4" src="'+video+'"></video></a>');
    }
});
});

//Load last patient
var lastID = localStorage.getItem("lastPatient")
if(lastID === null){

    console.log('its empty');
}
else{
    var type = "patientInfo";

    $.post("http://www.digitaljimmi.com/api.php", {"type": type, 'id': lastID}, function (data) {
        var result = JSON.parse(data);
        for (var i = 0; i < result.length; i++) {
            var name = result[i].fullname;
            var image = result[i].image;
            var infotext = result[i].infotext;

            var born = result[i].born;
            var bornDate = moment(born).format('DD-MM-YYYY');

            var inlaid = result[i].inlaid;
            var inlaidDate = moment(inlaid).format('DD-MM-YYYY');
            var inlaidWeek = moment(inlaid).week();

            profileImage.append('<img src="'+image+'" alt="'+name+'">'); 
            patientName.text(name); 
            patientBorn.text('Født: '+bornDate);
            patientinlaid.text('Indlagt: '+inlaidDate+' (Uge: '+inlaidWeek+')');
            patientText.text(infotext);
        }
    });
}