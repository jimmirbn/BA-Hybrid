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
