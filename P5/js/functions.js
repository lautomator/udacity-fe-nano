$( document ).ready(function() {
    // change the order of the columns
    // when the window is sized to desktop
    // >= 992px
    if ($(window).width() >= 992) {
        $('#nav').addClass('col-md-push-3');
        $('#search').addClass('col-md-pull-9');
    }
});