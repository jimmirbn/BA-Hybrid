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
    $$('.loading').show();
    $$.post(connection, {
        "patientInfo": patientInfo,
        'id': getInfo
    }, function(data) {
        $$('.noPatient').hide();
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
        $$('.loading').hide();
    });

};

function getImages(id, type) {
    var type = type;
    $$('.loading').show();
    $$.post(connection, {
        "type": type,
        'id': id
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            if (type == 'processimages') {
                console.log('no processimages');
                processImage.append('<div class="no-results"><p>Ingen process billeder</p></div>')
                var dots = processImage.siblings()[0];
                $$(dots).hide();
            }
            if (type == 'transferimages') {
                console.log('no transferimages');
                transfersImage.append('<div class="no-results"><p>Ingen billeder af flytninger</p></div>')
                var dots = transfersImage.siblings()[0];
                $$(dots).hide();
            }
            if (type == 'positioningimages') {
                console.log('no positioningimages');
                positioningImage.append('<div class="no-results"><p>Ingen billeder af lejringer</p></div>')
                var dots = positioningImage.siblings()[0];
                $$(dots).hide();
            }
        } else {
            if (type == 'processimages') {
                for (var i = 0; i < result.length; i++) {
                    var image = result[i].processimage;
                    var imagedate = result[i].processimagedate;
                    processImage.append('<div class="swiper-slide"><p class="sliderDate">' + imagedate + '</p><a href="#" class="openPhoto"><img class="photo" src="' + image + '" alt="' + imagedate + '"></a></div>');
                }
            }
            if (type == 'transferimages') {
                for (var i = 0; i < result.length; i++) {
                    var image = result[i].transferimage;
                    var imagedate = result[i].transferimagedate;
                    transfersImage.append('<div class="swiper-slide test"><p class="sliderDate">' + imagedate + '</p><a href="#" class="openPhoto"><img class="photo" src="' + image + '" alt="' + imagedate + '"></a></div>');
                }
            }
            if (type == 'positioningimages') {
                for (var i = 0; i < result.length; i++) {
                    var image = result[i].positioningimage;
                    var imagedate = result[i].positioningimagedate;
                    positioningImage.append('<div class="swiper-slide"><p class="sliderDate">' + imagedate + '</p><a href="#" class="openPhoto"><img class="photo" src="' + image + '" alt="' + imagedate + '"></a></div>');
                }
            }
        }
        $$('.loading').hide();
    });
};

function getNotes(id, type) {
    var type = type;
    $$('.loading').show();
    $$.post(connection, {
        "type": type,
        'id': id
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            if (type == 'processnotes') {
                console.log('no processnotes');
                processNotes.append('<div class="no-results"><p>Ingen process noter</p></div>')
                var dots = processNotes.siblings()[0];
                $$(dots).hide();
            }
            if (type == 'transfernotes') {
                console.log('no transfernotes');
                transfersNotes.append('<div class="no-results"><p>Ingen forflytnings noter</p></div>')
                var dots = transfersNotes.siblings()[0];
                $$(dots).hide();
            }
            if (type == 'positioningnotes') {
                console.log('no positioningnotes');
                positioningNotes.append('<div class="no-results"><p>Ingen lejrings noter</p></div>')
                var dots = positioningNotes.siblings()[0];
                $$(dots).hide();
            }
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
        $$('.loading').hide();
    });
};

function getVideos(id, type) {
    var type = type;
    $$('.loading').show();
    $$.post(connection, {
        "type": type,
        'id': id
    }, function(data) {
        var result = JSON.parse(data);
        if (result == '') {
            if (type == 'processvideos') {
                console.log('no processimages');
                processVideo.append('<div class="no-results"><p>Ingen process videoer</p></div>')
                var dots = processVideo.siblings()[0];
                $$(dots).hide();
            }
            if (type == 'transfervideos') {
                console.log('no transferimages');
                transfersVideo.append('<div class="no-results"><p>Ingen videoer af forflytninger</p></div>')
                var dots = transfersVideo.siblings()[0];
                $$(dots).hide();
            }
            if (type == 'positioningvideos') {
                console.log('no positioningimages');
                positioningVideo.append('<div class="no-results"><p>Ingen videoer af lejring</p></div>')
                var dots = positioningVideo.siblings()[0];
                $$(dots).hide();
            }
        } else {
            if (type == 'processvideos') {
                for (var i = 0; i < result.length; i++) {
                    var video = result[i].processvideo;
                    var videodate = result[i].processvideodate;
                    var videotitle = result[i].processvideotitle;
                    processVideo.append('<div class="swiper-slide"><h3 class="videoTitle">' + videotitle + '</h3><p class="sliderDate">' + videodate + '</p><a href="#" class="openVideo"><video><source data-id="' + videodate + '" type="video/mp4" src="' + video + '"></video></a></div>');
                }
            }
            if (type == 'transfervideos') {
                for (var i = 0; i < result.length; i++) {
                    var video = result[i].transfervideo;
                    var videodate = result[i].transfervideodate;
                    var videotitle = result[i].transfervideotitle;
                    transfersVideo.append('<div class="swiper-slide"><h3 class="videoTitle">' + videotitle + '</h3><p class="sliderDate">' + videodate + '</p><a href="#" class="openVideo"><video><source data-id="' + videodate + '" type="video/mp4" src="' + video + '"></video></a></div>');
                }
            }
            if (type == 'positioningvideos') {
                for (var i = 0; i < result.length; i++) {
                    var video = result[i].positioningvideo;
                    var videodate = result[i].positioningvideodate;
                    var videotitle = result[i].positioningvideotitle;
                    positioningVideo.append('<div class="swiper-slide"><h3 class="videoTitle">' + videotitle + '</h3><p class="sliderDate">' + videodate + '</p><a href="#" class="openVideo"><video><source data-id="' + videodate + '" type="video/mp4" src="' + video + '"></video></a></div>');
                }
            }
        }
        $$('.loading').hide();
    });
};

$$(document).on("click", ".getPatientInfo", function() {
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
});

//Load last patient

if (lastID === null) {
    $$('.noPatient').show();
} else {
    $$('.noPatient').hide();
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
}
