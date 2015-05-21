$$(document).on("click", ".openProcessPhoto", function() {
    theImage = $(this).find('img').attr('src');
    var myPhotoBrowserDarkProcess = myApp.photoBrowser({
        photos: ProcessArr,
        theme: 'dark'
    });
    var indexNr = this.id;
    // for (var i = 0; i < ProcessArr.length; i++) {
    //     if (ProcessArr[i].url == theImage) {
    //         var theImageNr = i;
    //     }
    // }
    myPhotoBrowserDarkProcess.open(indexNr);
});
$$(document).on("click", ".openTransferPhoto", function() {
    theImage = $(this).find('img').attr('src');

    var myPhotoBrowserDarkTransfer = myApp.photoBrowser({
        photos: TransferArr,
        theme: 'dark'
    });
    // for (var i = 0; i < TransferArr.length; i++) {
    //     if (TransferArr[i].url == theImage) {
    //         var theImageNr = i;
    //     }
    // }
    var indexNr = this.id;
    myPhotoBrowserDarkTransfer.open(indexNr);
});
$$(document).on("click", ".openPositioningPhoto", function() {
    theImage = $(this).find('img').attr('src');

    var myPhotoBrowserDarkPositioning = myApp.photoBrowser({
        photos: PositioningArr,
        theme: 'dark'
    });
    // for (var i = 0; i < PositioningArr.length; i++) {
    //     if (PositioningArr[i].url == theImage) {
    //         var theImageNr = i;
    //     }
    // }
    var indexNr = this.id;
    myPhotoBrowserDarkPositioning.open(indexNr);
});

$$(document).on("click", ".openProcessVideo", function() {
    theVideo = $(this).html();
    var myVideoBrowserDarkProcess = myApp.photoBrowser({
        photos: ProcessVideoArr,
        theme: 'dark'
    });
    // for (var i = 0; i < ProcessVideoArr.length; i++) {
    //     if (ProcessVideoArr[i].html == theVideo) {
    //         var theVideoNr = i;
    //     }
    // }
    var indexNr = this.id;
    myVideoBrowserDarkProcess.open(indexNr);
});
$$(document).on("click", ".openTransferVideo", function() {

    theVideo = $(this).html();
    var myVideoBrowserDarkTransfer = myApp.photoBrowser({
        photos: TransferVideoArr,
        theme: 'dark'
    });
    // for (var i = 0; i < TransferVideoArr.length; i++) {
    //     if (TransferVideoArr[i].html == theVideo) {
    //         var theVideoNr = i;
    //     }
    // }
    var indexNr = this.id;
    myVideoBrowserDarkTransfer.open(indexNr);
});
$$(document).on("click", ".openPositioningVideo", function() {

    theVideo = $(this).html();
    var myVideoBrowserDarkPositioning = myApp.photoBrowser({
        photos: PositioningVideoArr,
        theme: 'dark'
    });
    // for (var i = 0; i < PositioningVideoArr.length; i++) {
    //     if (PositioningVideoArr[i].html == theVideo) {
    //         var theVideoNr = i;
    //     }
    // }
    var indexNr = this.id;
    myVideoBrowserDarkPositioning.open(indexNr);
});
