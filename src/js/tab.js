$$(".tabs-menu li").click(function(event) {
    event.preventDefault();
    // $(this).parent().addClass("current");
    $(this).addClass("current");
    // $(this).parent().siblings().removeClass("current");
    $(this).siblings().removeClass("current");
    var tab = $(this).attr("data-id");
    $(".tab-content").not(tab).addClass('hide');
    $(tab).removeClass('hide');
});
