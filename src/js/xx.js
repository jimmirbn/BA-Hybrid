$$(".toggler").click(function(event) {
    event.preventDefault();
    if (!$(this).hasClass('open')) {
        $(this).addClass('open');
    }
    else{
        $(this).removeClass('open')
    }
});

$$(".panel-overlay").click(function(event) {
    if ($(".toggler").hasClass('open')) {
        $(".toggler").removeClass('open');
        leftView.router.loadPage('index.html');
        setTimeout(function() {
        $('.view-left .page-on-left').remove();
        }, 1000);
    }
});
