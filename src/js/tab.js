$(document).ready(function() {
	// var tabBtnContainer = $('.tabs-menu');
	// var tabsContainerH = $('#tabs-container').height();
	// tabBtnContainer.css('height',tabsContainerH);
    $(".tabs-menu a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(".tab-content").not(tab).addClass('hide');
        $(tab).removeClass('hide');
    });
});