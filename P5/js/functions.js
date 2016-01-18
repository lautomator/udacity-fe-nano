$(document).ready(function() {
    // This script handles initial page rendering details
    // and the Google MAps API.

    /* -------------------------------------------
        page rendering, appearence, and responsive
       ------------------------------------------- */

    var isDesktop = false,
        mapDiv = neighborhoodMapTargets.mapDiv,
        moreButton = neighborhoodMapTargets.moreButton,
        map;

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

    // Google maps/places functions
    initMap: function(targets) {
        // get the data to pass into the map service
        var params = viewModel,
            mapDiv = targets.mapDiv;

        // defines the location based on the model data
        // renders the map
        var loc = {
            lat: params.lat(),
            lng: params.lng()
        };


        map = new google.maps.Map(mapDiv, {
            center: loc,
            zoom: 17
        });

        this.showStatus();

        // var service = new google.maps.places.PlacesService(map);
        // service.nearbySearch({
        //     location: loc,
        //     radius: params.placeRadius(),
        //     types: [params.placeType()]
        // }, processResults);
    },
    processResults: function(results, status, pagination) {
        // process the results from the query
        // show more results, if available

        if (status !== google.maps.places.PlacesServiceStatus.OK) {
            return;
        } else {

            createMarkers(results);

            if (pagination.hasNextPage) {

                moreButton.disabled = false;

                $(moreButton).click(function() {
                    moreButton.disabled = true;
                    pagination.nextPage();
                });
            }
        }
    },
    createMarkers: function(places) {
        // creates the markers
        var bounds = new google.maps.LatLngBounds(),
            titles = [];

        for (var i = 0, place; place = places[i]; i++) {
            var marker = new google.maps.Marker({
                map: map,
                icon: map.icon,
                title: place.name,
                position: place.geometry.location
            });

            bounds.extend(place.geometry.location);

            titles.push(place.name);
        }

        map.fitBounds(bounds);

    },
    init: function() {
        this.initMap(neighborhoodMapTargets);
    }
};

