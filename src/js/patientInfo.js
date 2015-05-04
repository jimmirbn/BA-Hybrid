var type = "patientInfo";

$.post("api.php", {"type": type}, function (data) {
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

        $("#profileImage").append('<img src="'+image+'" alt="'+name+'">'); 
        $("#patientName").text(name); 
        $("#patientBorn").text('Født: '+bornDate);
        $("#patientinlaid").text('Indlagt: '+inlaidDate+' (Uge: '+inlaidWeek+')');
        $("#patientText").text(infotext);
    }
});