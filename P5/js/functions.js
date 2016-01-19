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
        var allLocations = data.locations,
            params = viewModel,
            results = params.currentLocations(),
            mapDiv = targets.mapDiv,
            markers = [],
            map;

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
                zoom: 16
            });

            // will hide status if 'success' upon loading data
            this.showStatus();

            // add markers to the markers array
            setMarkers(results);

            // get the markers from the array and render
            getMarkers(map, markers);

            console.log(markers.length)

        } else {
            // add the current markers (based on the filter query)
            // to the markers array
            setMarkers(results);

            console.log(markers.length);

            // clear the existing markers
            clearMarkers(markers);
        }

        function setMarkers(results) {
            // generate the markers and push them to the 'markers' array
            var index = 0,
                len = results.length;

            while (index < len) {
                marker = new google.maps.Marker({
                    map: map,
                    position: {
                        lat: results[index].venue.location.lat,
                        lng: results[index].venue.location.lng
                    },
                    title: results[index].venue.name
                });

                markers.push(marker);

                index += 1;
            }
        }

        function getMarkers(map, markers) {
            // draw the markers for the current results
            var index = 0,
                len = markers.length;

            while (index < len) {
                markers[index].setMap(map);
                index += 1;
            }
        }

        function clearMarkers() {
            // clears the current markers from the screen
            getMarkers(null, markers);
        }
    },
    init: function() {
        this.initMap(neighborhoodMapTargets, false);
    }
};

