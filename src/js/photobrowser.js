$$(document).on("click", ".openPhoto", function() {
    var arr = [];
    var img = $(this).parent().parent().parent().find("img"),
        len = img.length;
    if (len > 0) {

        img.each(function() {
            arr.push({
                url: $(this).attr("src"),
                caption: $(this).attr("alt")
            });

        });
    }

    var myPhotoBrowserDark = myApp.photoBrowser({
        photos: arr,
        theme: 'dark'
    });

    theImage = $(this).find('img').attr('src');
    for (var i = 0; i < img.length; i++) {

        if (img[i].src == theImage) {
            var theImageNr = i;
            myPhotoBrowserDark.open(theImageNr);
        }
    }

});

$$(document).on("click", ".openVideo", function() {
    var video = $(this).parent().parent().parent().find("source");
    var arr = [];

    video.each(function(i) {
        arr.push({
            html: '<video controls class="videoPlay" src="' + $(this).attr("src") + '"></video>',
            caption: '' + $(this).attr("data-id")
        });
    });

    var myVideoBrowserDark = myApp.photoBrowser({
        photos: arr,
        theme: 'dark',
        onClose: function() {
            $('.videoPlay')[0].pause();
        }
    });

    theVideo = $(this).find('source').attr('src');

    for (var i = 0; i < video.length; i++) {

        if (video[i].src == theVideo) {
            var theVideoNr = i;
            myVideoBrowserDark.open(theVideoNr);
        }
    }
    // $('.videoPlay')[0].play;
});
