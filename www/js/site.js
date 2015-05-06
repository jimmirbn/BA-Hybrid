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
var mySwiper1 = myApp.swiper('.process-image', {
    pagination:'.process-image .swiper-pagination',
    observer: true,
    observeParents: true,

});
var mySwiper2 = myApp.swiper('.process-video', {
    pagination:'.process-video .swiper-pagination',
    observer: true,
    observeParents: true,

});
var mySwiper3 = myApp.swiper('.process-notes', {
    pagination:'.process-notes .swiper-pagination',
    observer: true,
    observeParents: true,

}); 
var mySwiper4 = myApp.swiper('.transfers-image', {
    pagination:'.transfers-image .swiper-pagination',
    observer: true,
    observeParents: true,
}); 
var mySwiper5 = myApp.swiper('.transfers-video', {
    pagination:'.transfers-video .swiper-pagination',
    observer: true,
    observeParents: true,
}); 
var mySwiper6 = myApp.swiper('.transfers-notes', {
    pagination:'.transfers-notes .swiper-pagination',
    observer: true,
    observeParents: true,
}); 
var mySwiper7 = myApp.swiper('.positioning-image', {
    pagination:'.positioning-image .swiper-pagination',
    observer: true,
    observeParents: true,
}); 
var mySwiper8 = myApp.swiper('.positioning-video', {
    pagination:'.positioning-video .swiper-pagination',
    observer: true,
    observeParents: true,
}); 
var mySwiper9 = myApp.swiper('.positioning-notes', {
    pagination:'.positioning-notes .swiper-pagination',
    observer: true,
    observeParents: true,
}); 

$(document).on("click", ".openPhoto", function() {
	var photo = $(this).find('img').attr('src');

	var myPhotoBrowserDark = myApp.photoBrowser({
		photos : [
		''+photo+'',
		],
		theme: 'dark'
	});

	myPhotoBrowserDark.open();
});

$(document).on("click", ".openVideo", function() {
	var video = $(this).find('source').attr('src');
	var myVideoBrowserDark = myApp.photoBrowser({
		photos : [
		'<video controls class="videoPlay" src='+video+'></video>',
		],
		theme: 'dark',
		toolbar: false, // måske
		onClose: function () {
			$('.videoPlay')[0].pause();
		}
	});
	myVideoBrowserDark.open();
	$('.videoPlay')[0].play();

});
var type = "patientlejring";

$.post("api.php", {"type": type}, function (data) {
    var result = JSON.parse(data);
    for (var i = 0; i < result.length; i++) {
        var image = result[i].image;
        var imagedate = result[i].imagedate;
        var note = result[i].note;
        var notedate = result[i].notedate;
        var video = result[i].video;
        var videodate = result[i].videodate;

        $("#positioning-image").append('<a href="#" class="openPhoto"><img src="'+image+'"></a>');
        $("#positioning-video").append('<a href="#" class="openVideo"><video><source type="video/mp4" src="'+video+'"></video></a>');
    }
});


$(document).on("click", ".getPatientInfo", function() {
    var patientID = this.id;
    var type = "patientInfo";

    $.post("api.php", {"type": type, 'id': patientID}, function (data) {
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

});
$(document).on("click", ".getPatientList", function() {
    var roomnr = this.id;
    var type = "patientListData";
    $.post("api.php", {"type": type, 'roomnr' : roomnr}, function (data) {
        var result = JSON.parse(data);
        for (var i = 0; i < result.length; i++) {

            var name = result[i].fullname;
            var id = result[i].id;
            $('.patientList').append('<li>'+
            '<a id="'+id+'" href="" class="item-link getPatientInfo">'+
              '<div class="item-content">'+
                '<div class="item-inner">'+
                  '<div class="item-title">'+name+'</div>'+
                '</div>'+
              '</div>'+
            '</a>'+
          '</li>'
          );
        }
    });
});
$(document).on("click", ".team", function() {
    var teamnr = this.id;
    var type = "roomdata";
    $.post("api.php", {"type": type, 'teamnr' : teamnr}, function (data) {
        var result = JSON.parse(data);
        for (var i = 0; i < result.length; i++) {

            var stuenr = result[i].stuenr;
            $('.roomData').append('<li>'+
            '<a id="'+stuenr+'" href="left-page-2.html" class="item-link getPatientList">'+
              '<div class="item-content">'+
                '<div class="item-inner">'+
                  '<div class="item-title">Stue '+stuenr+'</div>'+
                '</div>'+
              '</div>'+
            '</a>'+
          '</li>'
          );
        }
    });
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
        $(".tab-content").not(tab).addClass('hide');
        $(tab).removeClass('hide');
    });
});
//# sourceMappingURL=site.js.map