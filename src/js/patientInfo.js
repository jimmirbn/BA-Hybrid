var lastID = localStorage.getItem("lastPatient")

function patientInfo(whereistheidfrom, newid) {
    var patientInfo = "patientInfo";
    var id = whereistheidfrom;
    $('#patientID').val('');
    if (id == 'stored') {
        $('#patientID').val(lastID);
        var getInfo = lastID;
    }
    if (id == 'new') {
        $('#patientID').val(newid);
        var getInfo = newid;
        localStorage.setItem("lastPatient", newid);
    }
    $$.post(connection, {
        "patientInfo": patientInfo,
        'id': getInfo
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

};

function getImages(id, type) {
    var type = type;
    $$.post(connection, {
        "type": type,
        'id': id
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no images');
        } else {
            if (type == 'processimages') {
                for (var i = 0; i < result.length; i++) {
                    var image = result[i].processimage;
                    var imagedate = result[i].processimagedate;
                    processImage.append('<div class="swiper-slide"><p class="sliderDate">' + imagedate + '</p><a href="#" class="openPhoto"><img class="photo" src="' + image + '" alt="'+imagedate+'"></a></div>');
                }
            }
            if (type == 'transferimages') {
                for (var i = 0; i < result.length; i++) {
                    var image = result[i].transferimage;
                    var imagedate = result[i].transferimagedate;
                    transfersImage.append('<div class="swiper-slide test"><p class="sliderDate">' + imagedate + '</p><a href="#" class="openPhoto"><img class="photo" src="' + image + '" alt="'+imagedate+'"></a></div>');
                }
            }
            if (type == 'positioningimages') {
                for (var i = 0; i < result.length; i++) {
                    var image = result[i].positioningimage;
                    var imagedate = result[i].positioningimagedate;
                    positioningImage.append('<div class="swiper-slide"><p class="sliderDate">' + imagedate + '</p><a href="#" class="openPhoto"><img class="photo" src="' + image + '" alt="'+imagedate+'"></a></div>');
                }
            }
        }
    });
};

function getNotes(id, type) {
    var type = type;
    $$.post(connection, {
        "type": type,
        'id': id
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            console.log('no notes');
        } else {
            if (type == 'processnotes') {
                for (var i = 0; i < result.length; i++) {
                    var note = result[i].processnote;
                    var notedate = result[i].processnotedate;
                    processNotes.append('<div class="swiper-slide test"><p class="sliderDate">' + notedate + '</p><p class="sliderNote">' + note + '</p></div>');
                }
            }
            if (type == 'transfernotes') {
                for (var i = 0; i < result.length; i++) {
                    var note = result[i].transfernote;
                    var notedate = result[i].transfernotedate;
                    transfersNotes.append('<div class="swiper-slide test"><p class="sliderDate">' + notedate + '</p><p class="sliderNote">' + note + '</p></div>');
                }
            }
            if (type == 'positioningnotes') {
                for (var i = 0; i < result.length; i++) {
                    var note = result[i].positioningnote;
                    var notedate = result[i].positioningnotedate;
                    positioningNotes.append('<div class="swiper-slide test"><p class="sliderDate">' + notedate + '</p><p class="sliderNote">' + note + '</p></div>');
                }
            }
        }
    });
};

function getVideos(id, type) {
        var type = type;
        $$.post(connection, {
            "type": type,
            'id': id
        }, function(data) {
            var result = JSON.parse(data);
            if (result == '') {
                console.log('no videos');
            } else {
                if (type == 'processvideos') {
                    for (var i = 0; i < result.length; i++) {
                        var video = result[i].processvideo;
                        var videodate = result[i].processvideodate;
                        var videotitle = result[i].processvideotitle;
                        processVideo.append('<div class="swiper-slide"><p class="videoTitle">' + videotitle + '</p><p class="sliderDate">' + videodate + '</p><a href="#" class="openVideo"><video controls poster="img/poster.jpg"><source data-id="'+videodate+'" type="video/mp4" src="' + video + '"></video></a></div>');
                    }
                }
                if (type == 'transfervideos') {
                    for (var i = 0; i < result.length; i++) {
                        var video = result[i].transfervideo;
                        var videodate = result[i].transfervideodate;
                        var videotitle = result[i].transfervideotitle;
                        transfersVideo.append('<div class="swiper-slide"><p class="videoTitle">' + videotitle + '</p><p class="sliderDate">' + videodate + '</p><a href="#" class="openVideo"><video controls poster="img/poster.jpg"><source data-id="'+videodate+'" type="video/mp4" src="' + video + '"></video></a></div>');
                    }
                }
                if (type == 'positioningvideos') {
                    for (var i = 0; i < result.length; i++) {
                        var video = result[i].positioningvideo;
                        var videodate = result[i].positioningvideodate;
                        var videotitle = result[i].positioningvideotitle;
                        positioningVideo.append('<div class="swiper-slide"><p class="videoTitle">' + videotitle + '</p><p class="sliderDate">' + videodate + '</p><a href="#" class="openVideo"><video controls poster="img/poster.jpg"><source data-id="'+videodate+'" type="video/mp4" src="' + video + '"></video></a></div>');
                    }
                }
            }
        });
    };

$$(document).on("click", ".getPatientInfo", function() {
    $$('.loading').show();
    var patientID = this.id;
    emptyPatientInfo();

    patientInfo('new', patientID);

    getImages(patientID, 'processimages');
    getImages(patientID, 'transferimages');
    getImages(patientID, 'positioningimages');

    getNotes(patientID, 'processnotes');
    getNotes(patientID, 'transfernotes');
    getNotes(patientID, 'positioningnotes');

    getVideos(patientID, 'processvideos');
    getVideos(patientID, 'transfervideos');
    getVideos(patientID, 'positioningvideos');
    $$('.loading').hide();
});

//Load last patient

if (lastID === null) {
    console.log('its empty');
} else {
    $$('.loading').show();
    emptyPatientInfo();
    patientInfo('stored');
    getImages(lastID, 'transferimages');
    getImages(lastID, 'processimages');
    getImages(lastID, 'positioningimages');

    getNotes(lastID, 'processnotes');
    getNotes(lastID, 'transfernotes');
    getNotes(lastID, 'positioningnotes');

    getVideos(lastID, 'processvideos');
    getVideos(lastID, 'transfervideos');
    getVideos(lastID, 'positioningvideos');
    $$('.loading').hide();
}
