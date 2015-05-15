var searchbar = $('.searchbar');
var results = $('#results');
var cancelBtn = $('.searchbar-cancel');
var overlay = $('.searchbar-overlay');
$("input[type=search]").focus(function() {
    if (!overlay.hasClass('active')) {
        overlay.addClass('active');
    }
});
$("input[type=search]").focusout(function() {
    if (overlay.hasClass('active')) {
        overlay.removeClass('active');
        cancelBtn.css('margin-right', '-53px');
        results.fadeOut();
    }
    if (searchbar.hasClass('searchbar-active')) {
        searchbar.removeClass('searchbar-active');
    }
    searchInput.val('');
});

$('.search').blur(function() {
    if (!this.value) {
        results.fadeOut();
    }
});

$(".search").keyup(function() {

    var search_keyword_value = $(this).val();

    if (search_keyword_value == "") {
        results.fadeOut();
    }
    var dataString = 'search_keyword=' + search_keyword_value;
    if (search_keyword_value != '') {
        $.ajax({
            type: "POST",
            url: connectionSearch,
            data: dataString,
            cache: false,
            success: function(html) {
                $("#results").html(html).show();
            }
        });
    }
    return false;
});
