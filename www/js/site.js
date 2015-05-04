// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add views
var leftView = myApp.addView('.view-left', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
var mySwiper = myApp.swiper('.process-image', {
    pagination:'.process-image-pagination'
}); 
var mySwiper = myApp.swiper('.process-video', {
    pagination:'.process-video-pagination'
}); 
var mySwiper = myApp.swiper('.process-notes', {
    pagination:'.process-notes-pagination'
}); 
var type = "patientInfo";

$.post("api.php", {"type": type}, function (data) {
    var result = JSON.parse(data);
    for (var i = 0; i < result.length; i++) {
        var name = result[i].fullname;
        var image = result[i].image;
        var infotext = result[i].infotext;

        var born = result[i].born;
        var bornDate = moment(born).format('DD-MM-YYYY');

        var inlaid = result[i].inlaid;
        var inlaidDate = moment(inlaid).format('DD-MM-YYYY');
        var inlaidWeek = moment(inlaid).week();

        $("#profileImage").append('<img src="'+image+'" alt="'+name+'">'); 
        $("#patientName").text(name); 
        $("#patientBorn").text('Født: '+bornDate);
        $("#patientinlaid").text('Indlagt: '+inlaidDate+' (Uge: '+inlaidWeek+')');
        $("#patientText").text(infotext);
    }
});
$(document).ready(function() {
	// var tabBtnContainer = $('.tabs-menu');
	// var tabsContainerH = $('#tabs-container').height();
	// tabBtnContainer.css('height',tabsContainerH);
    $(".tabs-menu a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();
    });
});
//# sourceMappingURL=site.js.map