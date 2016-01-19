$(document).ready(function() {
    // This script handles initial page rendering details
    // and the Google Maps API.

    /* -------------------------------------------
        page rendering, appearence, and responsive
       ------------------------------------------- */

    var isDesktop = false,
        mapDiv = neighborhoodMapTargets.mapDiv;

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
var appGoogleMap = function(mapStatus) {

    var map,
        markers = [],
        mapDiv = neighborhoodMapTargets.mapDiv,
        params = viewModel,
        results = params.currentLocations(),
        index = 0,
        len = results.length;

    function showStatus() {
        // Shows the status bar when a map load error occurs.
        // Otherwise, it is hidden.
        if (data.appStatus === 'success') {
            // hide this panel when data and map load successfully
            $('.status').remove();
        }
    }

    function initMap() {
        var location = {
            lat: data.geoCoords.lat,
            lng: data.geoCoords.lng
        };

        map = new google.maps.Map(mapDiv, {
            zoom: 16,
            center: location,
        });

        // add the markers
        while (index < len) {
            addMarker(results[index]);

            index += 1;
        }

        // will hide status if 'success' upon loading data
        showStatus();

        console.log(markers);
    }

    // Adds a marker to the map and push to the array.
    function addMarker(location) {
        var marker = new google.maps.Marker({
            position: {
                lat: results[index].venue.location.lat,
                lng: results[index].venue.location.lng
            },
            title: results[index].venue.name,
            map: map
        });

        markers.push(marker);
    }

    // Sets the map on all markers in the array.
    function setMapOnAll(map) {
        var index = 0,
            len = markers.length;

        while (index < len) {
            markers[index].setMap(map);
        }
    }

    // Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
        setMapOnAll(null);
    }

    // Shows any markers currently in the array.
    function showMarkers() {
        setMapOnAll(map);
    }

    // Deletes all markers in the array by removing references to them.
    function deleteMarkers() {
        clearMarkers();
        markers = [];
    }

    function init(mapStatus) {
        // draw the map if it has not been drawn before
        if (!mapStatus) {

            initMap();

        } else {
            clearMarkers();
            setMapOnAll(map);

            console.log('update the markers');
        }
    }

    init(mapStatus);
};