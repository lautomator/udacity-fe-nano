$( document ).ready(function() {
    // change the order of the columns
    // when the window is sized to desktop
    // >= 992px
    if ($(window).width() >= 992) {
        $('#nav').addClass('col-md-push-3');
        $('#search').addClass('col-md-pull-9');
    }

    // toggle the nav 'hamburger' when clicked
    $('#hamburger').click(function() {
        console.log('clicked');
        $('.list__content').toggleClass('is__hidden');
    });

});