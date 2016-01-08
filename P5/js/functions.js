$(document).ready(function() {
    // this script handles some initial rendering options

    var isDesktop = false,
        searchForm = neighborhoodMapTargets.searchFormTemplate,
        searchTemplate = $(searchForm).html(),
        mapdiv = neighborhoodMapTargets.mapDiv;

    function detectBrowser() {
        // Google Maps API:
        // Scale the map div window based on device
        var useragent = navigator.userAgent;

        if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
            // get the device's window height minus the nav bar header
            // (for some reason 100% height does not work here.)
            var deviceWinHeight = $(window).height() - 50;

            mapdiv.style.height = deviceWinHeight + 'px';
            mapdiv.style.width = '100%';

        } else {
            mapdiv.style.height = '450px';
        }
    }

    function orderColumns() {
        // change the order of the columns
        // when the window is sized to desktop
        // >= 992px
        if ($(window).width() >= 992) {
            $('#nav').addClass('col-md-push-3');
            $('#search').addClass('col-md-pull-9');

            isDesktop = true;
        }
    }

    function mobileMenu() {
        // toggle the nav 'hamburger' when clicked
        $('#hamburger').click(function() {
            $('.list_content').toggleClass('is_hidden');
        });
    }

    function renderForm() {
        // render the search box form in either
        // the desktop or mobile version
        if (isDesktop) {
            // render for desktop
            $('.search_mobile').remove();
        } else {
            // render for mobile
            $('.search_desktop').remove();
        }
    }

    // function getGeocodes(q) {
    //     // returns the geocodes to be used
    //     // to draw the map. 'q' is passed
    //     // in from the search query or default
    //     var geoCodes = {
    //             lat: '',
    //             lng: ''
    //         },
    //         geoCodesJson = 'http://maps.googleapis.com/maps/api/geocode/json?' + q;

    //         // need some error handling

    //         // parse json
    //         var parsed = JSON.parse(geoCodesJson);

    //         geoCodes.lat = parsed.results.geometry.location.lat;
    //         geoCodes.lng = parsed.results.geometry.location.lng;

    //     return geoCodes;
    // }

    function initMap() {
        // renders the Google map
        // data from search query passed in
        // map is rendered based on query or is default
        var map = new google.maps.Map(mapdiv, {
            center: {
                lat: -34.397,
                lng: 150.644
            },
            scrollwheel: false,
            zoom: 8
        });
    }

    function init() {
        // function calls from above
        detectBrowser();
        orderColumns();
        mobileMenu();
        renderForm();
        initMap();
    }

    init();
});