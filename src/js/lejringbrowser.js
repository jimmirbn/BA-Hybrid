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