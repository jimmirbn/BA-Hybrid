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