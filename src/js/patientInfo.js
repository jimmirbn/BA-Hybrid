var lastID = localStorage.getItem("lastPatient");

function patientInfo(whereistheidfrom, newid) {
    var patientInfo = "patientInfo";
    var id = whereistheidfrom;
    $('#patientID').val('');
    if (id == 'stored') {
        $('#patientID').val(lastID);
        var getInfo = lastID;
        btnDelete.attr('id',getInfo);
    }
    if (id == 'new') {
        $('#patientID').val(newid);
        var getInfo = newid;
        localStorage.setItem("lastPatient", newid);
        btnDelete.attr('id',getInfo);
    }
    $$('.loading').show();
    $$.post(connection, {
        "patientInfo": patientInfo,
        'id': getInfo
    }, function(data) {
        $$('.noPatient').hide();
        var result = JSON.parse(data);
        for (var i = 0; i < result.length; i++) {
            var roomnr = result[i].roomnr;
            var name = result[i].fullname;
            var profileimage = result[i].profileimage;
            var infotext = result[i].infotext;

            var born = result[i].born;

            var inlaid = result[i].inlaid;

            profileImage.append('<img src="' + profileimage + '" alt="' + name + '">');
            patientName.text(name);
            patientBorn.text('CPR: ' + born);
            patientinlaid.text('Indlagt: ' + inlaid);
            patientText.text(infotext);
            patientRoom.text("Stue nr: "+roomnr);

        }

        $$('.loading').hide();
    });

};

function getImages(id, type) {
    ProcessArr.length = 0;
    TransferArr.length = 0;
    PositioningArr.length = 0;
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
                processImage.append('<div class="no-results"><p>Ingen process billeder</p></div>');
                var dots = processImage.siblings()[0];
                $$(dots).hide();
            }
            if (type == 'transferimages') {
                console.log('no transferimages');
                transfersImage.append('<div class="no-results"><p>Ingen billeder af flytninger</p></div>');
                var dots = transfersImage.siblings()[0];
                $$(dots).hide();
            }
            if (type == 'positioningimages') {
                console.log('no positioningimages');
                positioningImage.append('<div class="no-results"><p>Ingen billeder af lejringer</p></div>');
                var dots = positioningImage.siblings()[0];
                $$(dots).hide();
            }
        } else {
            if (type == 'processimages') {

                $.each(result, function() {
                    ProcessArr.push({
                        url: this.processimage,
                        caption: this.processimagedate+"<br>"+this.processimageinfo
                    });
                });
                for (var i = 0; i < result.length; i++) {
                    var image = result[i].processimage;
                    var imagedate = result[i].processimagedate;
                    var id = result[i].id;
                    processImage.append('<div class="swiper-slide"><a data-array="ProcessArr" data-index="'+i+'" data-id="'+type+'" id="'+id+'" class="deleteContent">X</a><p class="sliderDate">' + imagedate + '</p><a id="'+i+'" href="#" class="openPhoto openProcessPhoto"><img class="photo" src="' + image + '" alt="' + imagedate + '"></a></div>');
                }
            }
            if (type == 'transferimages') {
                $.each(result, function() {
                    TransferArr.push({
                        url: this.transferimage,
                        caption: this.transferimagedate
                    });
                });
                for (var i = 0; i < result.length; i++) {
                    var image = result[i].transferimage;
                    var imagedate = result[i].transferimagedate;
                    var id = result[i].id;
                    transfersImage.append('<div class="swiper-slide test"><a data-array="TransferArr" data-index="'+i+'" data-id="'+type+'" id="'+id+'" class="deleteContent">X</a><p class="sliderDate">' + imagedate + '</p><a id="'+i+'" href="#" class="openPhoto openTransferPhoto"><img class="photo" src="' + image + '" alt="' + imagedate + '"></a></div>');
                }
            }
            if (type == 'positioningimages') {
                $.each(result, function() {
                    PositioningArr.push({
                        url: this.positioningimage,
                        caption: this.positioningimagedate
                    });
                });
                for (var i = 0; i < result.length; i++) {
                    var image = result[i].positioningimage;
                    var imagedate = result[i].positioningimagedate;
                    var id = result[i].id;
                    positioningImage.append('<div class="swiper-slide"><a data-array="PositioningArr" data-index="'+i+'" data-id="'+type+'" id="'+id+'" class="deleteContent">X</a><p class="sliderDate">' + imagedate + '</p><a id="'+i+'" href="#" class="openPhoto openPositioningPhoto"><img class="photo" src="' + image + '" alt="' + imagedate + '"></a></div>');
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
                    var id = result[i].id;
                    processNotes.append('<div class="swiper-slide"><a data-index="'+i+'" data-id="'+type+'" id="'+id+'" class="deleteContent">X</a><p class="sliderDate">' + notedate + '</p><p class="sliderNote">' + note + '</p></div>');
                }
            }
            if (type == 'transfernotes') {
                for (var i = 0; i < result.length; i++) {
                    var note = result[i].transfernote;
                    var notedate = result[i].transfernotedate;
                    var id = result[i].id;
                    transfersNotes.append('<div class="swiper-slide"><a data-index="'+i+'" data-id="'+type+'" id="'+id+'" class="deleteContent">X</a><p class="sliderDate">' + notedate + '</p><p class="sliderNote">' + note + '</p></div>');
                }
            }
            if (type == 'positioningnotes') {
                for (var i = 0; i < result.length; i++) {
                    var note = result[i].positioningnote;
                    var notedate = result[i].positioningnotedate;
                    var id = result[i].id;
                    positioningNotes.append('<div class="swiper-slide"><a data-index="'+i+'" data-id="'+type+'" id="'+id+'" class="deleteContent">X</a><p class="sliderDate">' + notedate + '</p><p class="sliderNote">' + note + '</p></div>');
                }
            }
        }
        $$('.loading').hide();
    });
};

function getVideos(id, type) {
    ProcessVideoArr.length = 0;
    TransferVideoArr.length = 0;
    PositioningVideoArr.length = 0;
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
                $.each(result, function() {
                    ProcessVideoArr.push({
                        html: '<video controls=""><source type="video/mp4" src="' + this.processvideo + '"></video>',
                        caption: this.processvideodate
                    });
                });
                for (var i = 0; i < result.length; i++) {
                    var video = result[i].processvideo;
                    var videodate = result[i].processvideodate;
                    var videotitle = result[i].processvideotitle;
                    var id = result[i].id;
                    processVideo.append('<div class="swiper-slide"><a data-array="ProcessVideoArr" data-index="'+i+'" data-id="processvideo" id="'+id+'" class="deleteContent">X</a><h3 class="videoTitle">' + videotitle + '</h3><p class="sliderDate">' + videodate + '</p><a id="'+i+'" href="#" class="openVideo openProcessVideo"><video controls><source type="video/mp4" src="' + video + '"></video></a></div>');
                }
            }
            if (type == 'transfervideos') {
                $.each(result, function() {
                    TransferVideoArr.push({
                        html: '<video controls=""><source type="video/mp4" src="' + this.transfervideo + '"></video>',
                        caption: this.transfervideodate
                    });
                });
                for (var i = 0; i < result.length; i++) {
                    var video = result[i].transfervideo;
                    var videodate = result[i].transfervideodate;
                    var videotitle = result[i].transfervideotitle;
                    var id = result[i].id;
                    transfersVideo.append('<div class="swiper-slide"><a data-array="TransferVideoArr" data-index="'+i+'" data-id="transfervideo" id="'+id+'" class="deleteContent">X</a><h3 class="videoTitle">' + videotitle + '</h3><p class="sliderDate">' + videodate + '</p><a id="'+i+'" href="#" class="openVideo openTransferVideo"><video controls><source type="video/mp4" src="' + video + '"></video></a></div>');
                }
            }
            if (type == 'positioningvideos') {
                $.each(result, function() {
                    PositioningVideoArr.push({
                        html: '<video controls=""><source type="video/mp4" src="' + this.positioningvideo + '"></video>',
                        caption: this.positioningvideodate
                    });
                });
                for (var i = 0; i < result.length; i++) {
                    var video = result[i].positioningvideo;
                    var videodate = result[i].positioningvideodate;
                    var videotitle = result[i].positioningvideotitle;
                    var id = result[i].id;
                    positioningVideo.append('<div class="swiper-slide"><a data-array="PositioningVideoArr" data-index="'+i+'" data-id="positioningvideo" id="'+id+'" class="deleteContent">X</a><h3 class="videoTitle">' + videotitle + '</h3><p class="sliderDate">' + videodate + '</p><a id="'+i+'" href="#" class="openVideo openPositioningVideo"><video controls><source type="video/mp4" src="' + video + '"></video></a></div>');
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
