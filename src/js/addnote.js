$$('.popupType').on('click', function() {
    type = this.id;
    $('#type').val('');
    $('#type').val(type);
});

$$('.addNote').on('click', function() {
    var type = 'addNote';
    var patientID = $('#patientID').val();
    var theType = $('#type').val();
    var note = $('textarea[name="note"]').val();

    var notedate = moment().format('DD-MM-YYYY, H:mm');
    $$.post(connection, {
        'date': notedate,
        "type": type,
        "id": patientID,
        "note": note,
        "theType": theType
    }, function(data) {
        var result = JSON.parse(data);

        if (result != "error") {
            if (theType == 'transfer') {

                var transferNotesDelete = $('#transfers-notes .deleteContent');

                $.each(transferNotesDelete, function() {
                    var id = $(this).attr('data-index');
                    var oldId = parseInt(id);
                    $(this).attr('data-index', oldId + 1);
                });

                type = "transfernotes";
                var totalDivs;
                var countDivs = $('#transfers-notes .swiper-slide').length;
                if (countDivs == 0) {
                    var totalDivs = 0;
                    transfersNotes.empty();
                } else {
                    var totalDivs = countDivs;
                };
                transfersNotes.prepend('<div class="swiper-slide"><a data-index="0" data-id="' + type + '" id="' + result + '" class="deleteContent">X</a><p class="sliderDate">' + notedate + '</p><p class="sliderNote">' + note + '</p></div>');
                var dots = transfersNotes.siblings()[0];
                $$(dots).show();
            }
            if (theType == 'process') {

                var processNotesDelete = $('#process-notes .deleteContent');

                $.each(processNotesDelete, function() {
                    var id = $(this).attr('data-index');
                    var oldId = parseInt(id);
                    $(this).attr('data-index', oldId + 1);
                });

                var type = "processnotes";
                var totalDivs;
                var countDivs = $('#process-notes .swiper-slide').length;
                if (countDivs == 0) {
                    var totalDivs = 0;
                    processNotes.empty();
                } else {
                    var totalDivs = countDivs;
                };
                processNotes.prepend('<div class="swiper-slide"><a data-index="0" data-id="' + type + '" id="' + result + '" class="deleteContent">X</a><p class="sliderDate">' + notedate + '</p><p class="sliderNote">' + note + '</p></div>');
                var dots = processNotes.siblings()[0];
                $$(dots).show();
            }
            if (theType == 'positioning') {

                var positioningNotesDelete = $('#positioning-notes .deleteContent');

                $.each(positioningNotesDelete, function() {
                    var id = $(this).attr('data-index');
                    var oldId = parseInt(id);
                    $(this).attr('data-index', oldId + 1);
                });

                var type = "positioningnotes";
                var totalDivs;
                var countDivs = $('#positioning-notes .swiper-slide').length;
                if (countDivs == 0) {
                    var totalDivs = 0;
                    positioningNotes.empty();
                } else {
                    var totalDivs = countDivs;
                };
                positioningNotes.prepend('<div class="swiper-slide"><a data-index="0" data-id="' + type + '" id="' + result + '" class="deleteContent">X</a><p class="sliderDate">' + notedate + '</p><p class="sliderNote">' + note + '</p></div>');
                var dots = positioningNotes.siblings()[0];
                $$(dots).show();
            }

            myApp.closeModal('.popup-addNote');

            $('textarea[name="note"]').val('');

        } else {
            myApp.alert('Sorry, something went wrong, try again ' + result);
        }
    });
});
