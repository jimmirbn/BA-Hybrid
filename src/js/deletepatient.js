$$('.btn--delete').on('click', function() {
    id = this.id;

    myApp.confirm('Dette vil slette patient og alt tilhørende', function() {
        localStorage.clear();
        emptyPatientInfo();
        $$('.noPatient').show();

        var deletePatient = 'deletePatient';
        $$.post(connection, {
            "type": deletePatient,
            'id': id
        }, function(data) {});
    });
});
$$(document).on("click", ".deleteContent", function() {
    self = $(this);
    var dataArray = self.attr('data-array');
    var indexID = self.attr('data-index');

    var id = this.id;
    var category = self.attr('data-id');
    myApp.confirm('Vil du slette dette?', function() {

        var deleteItem = 'deleteItem';
        $$.post(connection, {
            "type": deleteItem,
            'id': id,
            'category': category,
        }, function(data) {
            var result = JSON.parse(data);
            if (result == "success") {
                if (dataArray == 'ProcessArr') {
                    mySwiper1.removeSlide(indexID);
                    ProcessArr.splice(indexID, 1);

                    var processimagesDivs = $('.openProcessPhoto');
                    var processimagesDelete = $('#process-image .deleteContent');

                    $.each(processimagesDivs, function(index) {
                        $(this).attr('id', index);
                    });
                    $.each(processimagesDelete, function(index) {
                        $(this).attr('data-index', index);
                    });

                    if (ProcessArr.length == 0) {
                        processImage.empty();
                        processImage.append('<div class="no-results"><p>Ingen process billeder</p></div>');
                        var dots = processImage.siblings()[0];
                        $$(dots).hide();
                    }
                }
                if (dataArray == 'TransferArr') {
                    mySwiper4.removeSlide(indexID);
                    TransferArr.splice(indexID, 1);

                    var transferimagesDivs = $('.openTransferPhoto');
                    var transferimagesDelete = $('#transfers-image .deleteContent');

                    $.each(transferimagesDivs, function(index) {
                        $(this).attr('id', index);
                    });
                    $.each(transferimagesDelete, function(index) {
                        $(this).attr('data-index', index);
                    });

                    if (TransferArr.length == 0) {
                        transfersImage.empty();
                        transfersImage.append('<div class="no-results"><p>Ingen billeder af flytninger</p></div>');
                        var dots = transfersImage.siblings()[0];
                        $$(dots).hide();
                    }
                }
                if (dataArray == 'PositioningArr') {
                    mySwiper7.removeSlide(indexID);
                    PositioningArr.splice(indexID, 1);

                    var positioningimagesDivs = $('.openPositioningPhoto');
                    var positioningimagesDelete = $('#positioning-image .deleteContent');

                    $.each(positioningimagesDivs, function(index) {
                        $(this).attr('id', index);
                    });
                    $.each(positioningimagesDelete, function(index) {
                        $(this).attr('data-index', index);
                    });

                    if (PositioningArr.length == 0) {
                        positioningImage.empty();
                        positioningImage.append('<div class="no-results"><p>Ingen billeder af lejringer</p></div>');
                        var dots = positioningImage.siblings()[0];
                        $$(dots).hide();
                    }
                }
                if (dataArray == 'PositioningVideoArr') {
                    mySwiper8.removeSlide(indexID);
                    PositioningVideoArr.splice(indexID, 1);

                    var positioningvideosDivs = $('.openPositioningVideo');
                    var positioningvideosDelete = $('#positioning-video .deleteContent');

                    $.each(positioningvideosDivs, function(index) {
                        $(this).attr('id', index);
                    });
                    $.each(positioningvideosDelete, function(index) {
                        $(this).attr('data-index', index);
                    });

                    if (PositioningVideoArr.length == 0) {
                        positioningVideo.empty();
                        positioningVideo.append('<div class="no-results"><p>Ingen videoer af lejring</p></div>');
                        var dots = positioningVideo.siblings()[0];
                        $$(dots).hide();
                    }
                }
                if (dataArray == 'ProcessVideoArr') {
                    mySwiper2.removeSlide(indexID);
                    ProcessVideoArr.splice(indexID, 1);

                    var processvideosDivs = $('.openProcessVideo');
                    var processvideosDelete = $('#process-video .deleteContent');

                    $.each(processvideosDivs, function(index) {
                        $(this).attr('id', index);
                    });
                    $.each(processvideosDelete, function(index) {
                        $(this).attr('data-index', index);
                    });

                    if (ProcessVideoArr.length == 0) {
                        processVideo.empty();
                        processVideo.append('<div class="no-results"><p>Ingen process videoer</p></div>');
                        var dots = processVideo.siblings()[0];
                        $$(dots).hide();
                    }
                }
                if (dataArray == 'TransferVideoArr') {
                    mySwiper5.removeSlide(indexID);
                    TransferVideoArr.splice(indexID, 1);

                    var transfervideosDivs = $('.openTransferVideo');
                    var transfervideosDelete = $('#transfers-video .deleteContent');

                    $.each(transfervideosDivs, function(index) {
                        $(this).attr('id', index);
                    });
                    $.each(transfervideosDelete, function(index) {
                        $(this).attr('data-index', index);
                    });

                    if (TransferVideoArr.length == 0) {
                        transfersVideo.empty();
                        transfersVideo.append('<div class="no-results"><p>Ingen videoer af forflytninger</p></div>');
                        var dots = transfersVideo.siblings()[0];
                        $$(dots).hide();
                    }
                }
                if (category == 'processnotes') {
                    mySwiper3.removeSlide(indexID);

                    var processNotesDelete = $('#process-notes .deleteContent');
                    $.each(processNotesDelete, function(index) {
                        $(this).attr('data-index', index);
                    });
                    var totalDivs;
                    var countDivs = $('#process-notes .swiper-slide').length;
                    if (countDivs == 0) {
                        var totalDivs = 0;
                        processNotes.empty();
                        processNotes.append('<div class="no-results"><p>Ingen process noter</p></div>');
                        var dots = processNotes.siblings()[0];
                        $$(dots).hide();
                    };
                }
                if (category == 'positioningnotes') {
                    mySwiper9.removeSlide(indexID);

                    var positioningNotesDelete = $('#positioning-notes .deleteContent');
                    $.each(positioningNotesDelete, function(index) {
                        $(this).attr('data-index', index);
                    });
                    var totalDivs;
                    var countDivs = $('#positioning-notes .swiper-slide').length;
                    if (countDivs == 0) {
                        var totalDivs = 0;
                        positioningNotes.empty();
                        positioningNotes.append('<div class="no-results"><p>Ingen lejrings noter</p></div>');
                        var dots = positioningNotes.siblings()[0];
                        $$(dots).hide();
                    };
                }
                if (category == 'transfernotes') {
                    mySwiper6.removeSlide(indexID);

                    var transferNotesDelete = $('#transfers-notes .deleteContent');
                    
                    $.each(transferNotesDelete, function(index) {
                        $(this).attr('data-index', index);
                    });
                    var totalDivs;
                    var countDivs = $('#transfers-notes .swiper-slide').length;
                    if (countDivs == 0) {
                        var totalDivs = 0;
                        transfersNotes.empty();
                        transfersNotes.append('<div class="no-results"><p>Ingen forflytnings noter</p></div>');
                        var dots = transfersNotes.siblings()[0];
                        $$(dots).hide();
                    };
                }
            }
        });
    });
});
