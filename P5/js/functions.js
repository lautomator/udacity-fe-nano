$(document).ready(function() {
    // This script handles initial page rendering details
    // and the Google Maps API.

    /* -------------------------------------------
        page rendering, appearence, and responsive
       ------------------------------------------- */

    var isDesktop = false,
        mapDiv = neighborhoodMapTargets.mapDiv,
        moreButton = neighborhoodMapTargets.moreButton;

    function detectBrowser() {
        // scale the map div window based on the device
        var useragent = navigator.userAgent,
            deviceWinHeight = $(window).height() - 50;

        if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {

            mapDiv.style.height = deviceWinHeight + 'px';
            mapDiv.style.width = '100%';

        } else {
            mapDiv.style.height = deviceWinHeight + 'px';
            mapDiv.style.width = '100%';
        }
    }

    function orderColumns() {
        // change the order of the columns
        // when the window is sized to desktop
        // >= 992px
        var deviceWinHeight = $(window).height() - 50;

        if ($(window).width() >= 992) {
            $('#nav').addClass('col-md-push-3');
            $('#search').addClass('col-md-pull-9');

            isDesktop = true;

            // set the results column to be 100% of the screen height
            $('.results_content').css('height', deviceWinHeight - 120);
        }
    }

    function mobileMenu() {
        // toggle the nav 'hamburger' when clicked
        $('#hamburger').click(function() {
            $('.list_content').toggleClass('is_hidden');
        });

        // make the nav bar disappear if the user clicks
        // the map in the mobile view
        $('#map').click(function() {
            $('.list_content').addClass('is_hidden');
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

    function init() {
        // function calls from above
        detectBrowser();
        orderColumns();
        mobileMenu();
        renderForm();
    }

    init();
});

/* -----------------
    Google Maps API
   ----------------- */
var appMap = {

    showStatus: function() {
        // Shows the status bar when a map load error occurs.
        // Otherwise, it is hidden.
        if (data.appStatus === 'success') {
            // hide this panel when data and map load successfully
            $('.status').remove();
        }
    },
    initMap: function(targets, mapStatus) {
        // get the data to pass into the map service
        var params = viewModel,
            results = params.currentLocations(),
            len = results.length,
            index = 0
            mapDiv = targets.mapDiv,
            map,
            markers = [];

        // defines the location based on the model data
        // renders the map
        var loc = {
            lat: params.lat(),
            lng: params.lng()
        };

        // draw the map if it has not been drawn before
        if (!mapStatus) {
            map = new google.maps.Map(mapDiv, {
                center: loc,
                zoom: 17
            });

            console.log(mapStatus);

        } else {
            console.log(mapStatus);
            // don't redraw the map, just update the markers


        }

        this.showStatus();

        function addMarker(results) {
            // draw the markers for the current results
            // and add to the markers array
            while (index < len) {
                marker = new google.maps.Marker({
                    map: map,
                    position: {
                        lat: results[index].venue.location.lat,
                        lng: results[index].venue.location.lng
                    }
                });

                markers.push(marker);

                index += 1;
            }
        }

        addMarker(results);
        console.log(markers);
    },
    init: function() {
        this.initMap(neighborhoodMapTargets, false);
    }
};

