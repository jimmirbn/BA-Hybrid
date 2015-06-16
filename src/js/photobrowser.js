$$(document).on("click", ".openProcessPhoto", function() {
    theImage = $(this).find('img').attr('src');
    var myPhotoBrowserDarkProcess = myApp.photoBrowser({
        photos: ProcessArr,
        theme: 'dark',
        captionsTemplate: '<div class="photo-browser-captions photo-browser-captions-dark active"><a class="minBrowser">Læs mere</a>{{captions}}</div>'
    });
    var indexNr = this.id;
    myPhotoBrowserDarkProcess.open(indexNr);
});

$$(document).on("click", ".openTransferPhoto", function() {
    theImage = $(this).find('img').attr('src');

    var myPhotoBrowserDarkTransfer = myApp.photoBrowser({
        photos: TransferArr,
        theme: 'dark',
        captionsTemplate: '<div class="photo-browser-captions photo-browser-captions-dark active"><a class="minBrowser">Læs mere</a>{{captions}}</div>'

    });

    var indexNr = this.id;
    myPhotoBrowserDarkTransfer.open(indexNr);
});
$$(document).on("click", ".openPositioningPhoto", function() {
    theImage = $(this).find('img').attr('src');

    var myPhotoBrowserDarkPositioning = myApp.photoBrowser({
        photos: PositioningArr,
        theme: 'dark',
        captionsTemplate: '<div class="photo-browser-captions photo-browser-captions-dark active"><a class="minBrowser">Læs mere</a>{{captions}}</div>'
        
    });

    var indexNr = this.id;
    myPhotoBrowserDarkPositioning.open(indexNr);
});

$$(document).on("click", ".openProcessVideo", function() {
    theVideo = $(this).html();
    var myVideoBrowserDarkProcess = myApp.photoBrowser({
        photos: ProcessVideoArr,
        theme: 'dark'
    });
    var indexNr = this.id;
    myVideoBrowserDarkProcess.open(indexNr);
});
$$(document).on("click", ".openTransferVideo", function() {

    theVideo = $(this).html();
    var myVideoBrowserDarkTransfer = myApp.photoBrowser({
        photos: TransferVideoArr,
        theme: 'dark'
    });
    var indexNr = this.id;
    myVideoBrowserDarkTransfer.open(indexNr);
});
$$(document).on("click", ".openPositioningVideo", function() {
    console.log('test');
    console.log(PositioningVideoArr);
    console.log(this.id);
    theVideo = $(this).html();
    var myVideoBrowserDarkPositioning = myApp.photoBrowser({
        photos: PositioningVideoArr,
        theme: 'dark'
    });

    var indexNr = this.id;
    myVideoBrowserDarkPositioning.open(indexNr);
});

$$(document).on("click", ".minBrowser", function() {
    var browser = $('.photo-browser-captions-dark');
        if (!browser.hasClass('active')) {
            browser.addClass('active');
            $(this).text('Læs mere')
        } else {
            browser.removeClass('active');
            $(this).text('Luk');
        }
});
