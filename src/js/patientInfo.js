$$(document).on("click", ".getPatientInfo", function() {
    var patientID = this.id;
    var type = "patientInfo";
    emptyPatientInfo();
    $('#patientID').val('');
    $('#patientID').val(patientID);
    localStorage.setItem("lastPatient", patientID);
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": type,
        'id': patientID
    }, function(data) {
        var result = JSON.parse(data);
        for (var i = 0; i < result.length; i++) {
            var name = result[i].fullname;
            var profileimage = result[i].profileimage;
            var infotext = result[i].infotext;
            var born = result[i].born;
            var bornDate = moment(born).format('DD-MM-YYYY');

            var inlaid = result[i].inlaid;
            var inlaidDate = moment(inlaid).format('DD-MM-YYYY');
            var inlaidWeek = moment(inlaid).week();

            profileImage.append('<img src="' + profileimage + '" alt="' + name + '">');
            patientName.text(name);
            patientBorn.text('Født: ' + bornDate);
            patientinlaid.text('Indlagt: ' + inlaidDate + ' (Uge: ' + inlaidWeek + ')');
            patientText.text(infotext);
        }
    });
//PROCESS START
    var processimages = 'getprocessimages';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": processimages,
        'id': patientID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no process images');
        } else {
            for (var i = 0; i < result.length; i++) {
                var image = result[i].processimage;
                var imagedate = result[i].processimagedate;
                processImage.append('<div class="swiper-slide"><p class="sliderDate">'+imagedate+'</p><a href="#" class="openPhoto"><img class="photo" src="' + image + '"></a></div>');
            }
        }
    });

    var processnotes = 'getprocessnotes';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": processnotes,
        'id': patientID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no process notes');
        } else {
            for (var i = 0; i < result.length; i++) {
                var note = result[i].processnote;
                var notedate = result[i].processnotedate;
                processNotes.append('<div class="swiper-slide test"><p class="sliderDate">'+notedate+'</p><p class="sliderNote">'+note+'</p></div>');
            }
        }
    });

    var processvideos = 'getprocessvideos';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": processvideos,
        'id': patientID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no process videos');
        } else {
            for (var i = 0; i < result.length; i++) {
                var video = result[i].processvideo;
                var videodate = result[i].processvideodate;
                var videotitle = result[i].processvideotitle;
                processVideo.append('<div class="swiper-slide"><p class="videoTitle">'+videotitle+'</p><p class="sliderDate">'+videodate+'</p><a href="#" class="openVideo"><video poster="img/poster.jpg"><source type="video/mp4" src="' + video + '"></video></a></div>');
                
            }
        }
    });
    //PROCESS END
    // TRANSFER START
    var transferimages = 'gettransferimages';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": transferimages,
        'id': patientID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no transfer images');
        } else {
            for (var i = 0; i < result.length; i++) {
                var image = result[i].transferimage;
                var imagedate = result[i].transferimagedate;
                transfersImage.append('<div class="swiper-slide test"><p class="sliderDate">'+imagedate+'</p><a href="#" class="openPhoto"><img class="photo" src="' + image + '"></a></div>');
            }
        }
    });

    var transfernotes = 'gettransfernotes';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": transfernotes,
        'id': patientID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no transfer notes');
        } else {
            for (var i = 0; i < result.length; i++) {
                var note = result[i].transfernote;
                var notedate = result[i].transfernotedate;
                transfersNotes.append('<div class="swiper-slide test"><p class="sliderDate">'+notedate+'</p><p class="sliderNote">'+note+'</p></div>');
            }
        }
    });

    var transfervideos = 'gettransfervideos';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": transfervideos,
        'id': patientID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no transfer videos');
        } else {
            for (var i = 0; i < result.length; i++) {
                var video = result[i].transfervideo;
                var videodate = result[i].transfervideodate;
                var videotitle = result[i].transfervideotitle;
                transfersVideo.append('<div class="swiper-slide"><p class="videoTitle">'+videotitle+'</p><p class="sliderDate">'+videodate+'</p><a href="#" class="openVideo"><video poster="img/poster.jpg"><source type="video/mp4" src="' + video + '"></video></a></div>');  
            }
        }
    });
// TRANSFER END

// positioning START
    var positioningimages = 'getpositioningimages';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": positioningimages,
        'id': patientID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no positioning images');
        } else {
            for (var i = 0; i < result.length; i++) {
                var image = result[i].positioningimage;
                var imagedate = result[i].positioningimagedate;
                positioningImage.append('<div class="swiper-slide"><p class="sliderDate">'+imagedate+'</p><a href="#" class="openPhoto"><img class="photo" src="' + image + '"></a></div>');
            }
        }
    });

    var positioningnotes = 'getpositioningnotes';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": positioningnotes,
        'id': patientID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no positioning notes');
        } else {
            for (var i = 0; i < result.length; i++) {
                var note = result[i].positioningnote;
                var notedate = result[i].positioningnotedate;
                positioningNotes.append('<div class="swiper-slide test"><p class="sliderDate">'+notedate+'</p><p class="sliderNote">'+note+'</p></div>');
            }
        }
    });

    var positioningvideos = 'getpositioningvideos';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": positioningvideos,
        'id': patientID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no positioning videos');
        } else {
            for (var i = 0; i < result.length; i++) {
                var video = result[i].positioningvideo;
                var videodate = result[i].positioningvideodate;
                var videotitle = result[i].positioningvideotitle;
                positioningVideo.append('<div class="swiper-slide"><p class="videoTitle">'+videotitle+'</p><p class="sliderDate">'+videodate+'</p><a href="#" class="openVideo"><video poster="img/poster.jpg"><source type="video/mp4" src="' + video + '"></video></a></div>');
                
            }
        }
    });
// positioning END
});

//Load last patient
var lastID = localStorage.getItem("lastPatient")
if (lastID === null) {

    console.log('its empty');
} else {
    emptyPatientInfo();
    var type = "patientInfo";
    $('#patientID').val('');
    $('#patientID').val(lastID);
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": type,
        'id': lastID
    }, function(data) {
        var result = JSON.parse(data);
        for (var i = 0; i < result.length; i++) {
            var name = result[i].fullname;
            var profileimage = result[i].profileimage;
            var infotext = result[i].infotext;

            var born = result[i].born;
            var bornDate = moment(born).format('DD-MM-YYYY');

            var inlaid = result[i].inlaid;
            var inlaidDate = moment(inlaid).format('DD-MM-YYYY');
            var inlaidWeek = moment(inlaid).week();

            profileImage.append('<img src="' + profileimage + '" alt="' + name + '">');
            patientName.text(name);
            patientBorn.text('Født: ' + bornDate);
            patientinlaid.text('Indlagt: ' + inlaidDate + ' (Uge: ' + inlaidWeek + ')');
            patientText.text(infotext);
        }
    });
// PROCESS START
    var processimages = 'getprocessimages';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": processimages,
        'id': lastID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no process images');
        } else {
            for (var i = 0; i < result.length; i++) {
                var image = result[i].processimage;
                var imagedate = result[i].processimagedate;
                processImage.append('<div class="swiper-slide"><p class="sliderDate">'+imagedate+'</p><a href="#" class="openPhoto"><img class="photo" src="' + image + '"></a></div>');
            }
        }
    });

    var processnotes = 'getprocessnotes';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": processnotes,
        'id': lastID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no process notes');
        } else {
            for (var i = 0; i < result.length; i++) {
                var note = result[i].processnote;
                var notedate = result[i].processnotedate;
                processNotes.append('<div class="swiper-slide test"><p class="sliderDate">'+notedate+'</p><p class="sliderNote">'+note+'</p></div>');
            }
        }
    });

    var processvideos = 'getprocessvideos';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": processvideos,
        'id': lastID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no process videos');
        } else {
            for (var i = 0; i < result.length; i++) {
                var video = result[i].processvideo;
                var videodate = result[i].processvideodate;
                var videotitle = result[i].processvideotitle;
                processVideo.append('<div class="swiper-slide"><p class="videoTitle">'+videotitle+'</p><p class="sliderDate">'+videodate+'</p><a href="#" class="openVideo"><video poster="img/poster.jpg"><source type="video/mp4" src="' + video + '"></video></a></div>');
                
            }
        }
    });

    // PROCESS END
    
    // TRANSFER START
    var transferimages = 'gettransferimages';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": transferimages,
        'id': lastID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no transfer images');
        } else {
            for (var i = 0; i < result.length; i++) {
                var image = result[i].transferimage;
                var imagedate = result[i].transferimagedate;
                transfersImage.append('<div class="swiper-slide test"><p class="sliderDate">'+imagedate+'</p><a href="#" class="openPhoto"><img class="photo" src="' + image + '"></a></div>');
            }
        }
    });

    var transfernotes = 'gettransfernotes';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": transfernotes,
        'id': lastID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no transfer notes');
        } else {
            for (var i = 0; i < result.length; i++) {
                var note = result[i].transfernote;
                var notedate = result[i].transfernotedate;
                transfersNotes.append('<div class="swiper-slide test"><p class="sliderDate">'+notedate+'</p><p class="sliderNote">'+note+'</p></div>');
            }
        }
    });

    var transfervideos = 'gettransfervideos';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": transfervideos,
        'id': lastID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no transfer videos');
        } else {
            for (var i = 0; i < result.length; i++) {
                var video = result[i].transfervideo;
                var videodate = result[i].transfervideodate;
                var videotitle = result[i].transfervideotitle;
                transfersVideo.append('<div class="swiper-slide"><p class="videoTitle">'+videotitle+'</p><p class="sliderDate">'+videodate+'</p><a href="#" class="openVideo"><video poster="img/poster.jpg"><source type="video/mp4" src="' + video + '"></video></a></div>');
                
            }
        }
    });
// TRANSFER END
    // positioning START
    var positioningimages = 'getpositioningimages';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": positioningimages,
        'id': lastID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no positioning images');
        } else {
            for (var i = 0; i < result.length; i++) {
                var image = result[i].positioningimage;
                var imagedate = result[i].positioningimagedate;
                positioningImage.append('<div class="swiper-slide"><p class="sliderDate">'+imagedate+'</p><a href="#" class="openPhoto"><img class="photo" src="' + image + '"></a></div>');
            }
        }
    });

    var positioningnotes = 'getpositioningnotes';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": positioningnotes,
        'id': lastID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no positioning notes');
        } else {
            for (var i = 0; i < result.length; i++) {
                var note = result[i].positioningnote;
                var notedate = result[i].positioningnotedate;
                positioningNotes.append('<div class="swiper-slide test"><p class="sliderDate">'+notedate+'</p><p class="sliderNote">'+note+'</p></div>');
            }
        }
    });

    var positioningvideos = 'getpositioningvideos';
    $.post("http://www.digitaljimmi.com/api.php", {
        "type": positioningvideos,
        'id': lastID
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no positioning videos');
        } else {
            for (var i = 0; i < result.length; i++) {
                var video = result[i].positioningvideo;
                var videodate = result[i].positioningvideodate;
                var videotitle = result[i].positioningvideotitle;
                positioningVideo.append('<div class="swiper-slide"><p class="videoTitle">'+videotitle+'</p><p class="sliderDate">'+videodate+'</p><a href="#" class="openVideo"><video poster="img/poster.jpg"><source type="video/mp4" src="' + video + '"></video></a></div>');
                
            }
        }
    });
// positioning END
}
