var type = "patientlejring";

$.post("api.php", {"type": type}, function (data) {
    var result = JSON.parse(data);
    for (var i = 0; i < result.length; i++) {
        var image = result[i].image;
        var imagedate = result[i].imagedate;
        var note = result[i].note;
        var notedate = result[i].notedate;
        var video = result[i].video;
        var videodate = result[i].videodate;

        $("#positioning-image").append('<div class="swiper-slide"><a style="background-image:url('+image+')" href="#" class="openPhoto"></a></div>');
        $("#positioning-video").append('<a href="#" class="openVideo"><video><source type="video/mp4" src="'+video+'"></video></a>');
    }
});

