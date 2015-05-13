$$(document).on("click", ".getPatientInfo", function() {
    var patientID = this.id;
    var patientInfo = "patientInfo";
    emptyPatientInfo();
    $('#patientID').val('');
    $('#patientID').val(patientID);
    localStorage.setItem("lastPatient", patientID);
    $.post("http://169.254.136.152/api.php", {
        "patientInfo": patientInfo,
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
    var getprocessimages = 'getprocessimages';
    $.post("http://169.254.136.152/api.php", {
        "getprocessimages": getprocessimages,
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

    var getprocessnotes = 'getprocessnotes';
    $.post("http://169.254.136.152/api.php", {
        "getprocessnotes": getprocessnotes,
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

    var getprocessvideos = 'getprocessvideos';
    $.post("http://169.254.136.152/api.php", {
        "getprocessvideos": getprocessvideos,
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
    var gettransferimages = 'gettransferimages';
    $.post("http://169.254.136.152/api.php", {
        "gettransferimages": gettransferimages,
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

    var gettransfernotes = 'gettransfernotes';
    $.post("http://169.254.136.152/api.php", {
        "gettransfernotes": gettransfernotes,
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

    var gettransfervideos = 'gettransfervideos';
    $.post("http://169.254.136.152/api.php", {
        "gettransfervideos": gettransfervideos,
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
    var getpositioningimages = 'getpositioningimages';
    $.post("http://169.254.136.152/api.php", {
        "getpositioningimages": getpositioningimages,
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

    var getpositioningnotes = 'getpositioningnotes';
    $.post("http://169.254.136.152/api.php", {
        "getpositioningnotes": getpositioningnotes,
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

    var getpositioningvideos = 'getpositioningvideos';
    $.post("http://169.254.136.152/api.php", {
        "getpositioningvideos": getpositioningvideos,
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
    var patientInfo = "patientInfo";
    $('#patientID').val('');
    $('#patientID').val(lastID);
    $.post("http://169.254.136.152/api.php", {
        "patientInfo": patientInfo,
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
    var getprocessimages = 'getprocessimages';
    $.post("http://169.254.136.152/api.php", {
        "getprocessimages": getprocessimages,
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

    var getprocessnotes = 'getprocessnotes';
    $.post("http://169.254.136.152/api.php", {
        "getprocessnotes": getprocessnotes,
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

    var getprocessvideos = 'getprocessvideos';
    $.post("http://169.254.136.152/api.php", {
        "getprocessvideos": getprocessvideos,
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
    var gettransferimages = 'gettransferimages';
    $.post("http://169.254.136.152/api.php", {
        "gettransferimages": gettransferimages,
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

    var gettransfernotes = 'gettransfernotes';
    $.post("http://169.254.136.152/api.php", {
        "gettransfernotes": gettransfernotes,
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

    var gettransfervideos = 'gettransfervideos';
    $.post("http://169.254.136.152/api.php", {
        "gettransfervideos": gettransfervideos,
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
    var getpositioningimages = 'getpositioningimages';
    $.post("http://169.254.136.152/api.php", {
        "getpositioningimages": getpositioningimages,
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

    var getpositioningnotes = 'getpositioningnotes';
    $.post("http://169.254.136.152/api.php", {
        "getpositioningnotes": getpositioningnotes,
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

    var getpositioningvideos = 'getpositioningvideos';
    $.post("http://169.254.136.152/api.php", {
        "getpositioningvideos": getpositioningvideos,
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
