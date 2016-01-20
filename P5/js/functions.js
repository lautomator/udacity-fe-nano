$(document).ready(function() {

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
var NeighborhoodGmap = function() {
    // the map class
    this.map;
    this.markers = [];
    this.mapDiv = neighborhoodMapTargets.mapDiv;
    this.params = viewModel;
    this.origLat = data.geoCoords.lat;
    this.origLng = data.geoCoords.lng;
    this.results = this.params.currentLocations();
    this.index = 0;
    this.len = this.results.length;
};

// map methods
NeighborhoodGmap.prototype.showStatus = function() {
    // Shows the status bar when a map load error occurs.
    // Otherwise, it is hidden.
    if (data.appStatus === 'success' && Map.hasOwnProperty('name')) {
        // hide this panel when data and map load successfully
        $('.status').remove();
    }
};

NeighborhoodGmap.prototype.addMarker = function(result) {
    this.marker = new google.maps.Marker({
        position: {
            lat: result.venue.location.lat,
            lng: result.venue.location.lng
        },
        title: result.venue.name,
        map: map
    });

    this.markers.push(this.marker);
};

NeighborhoodGmap.prototype.getMarkers = function() {
    // return the current markers in the array
    return this.markers;
};

NeighborhoodGmap.prototype.updateMarkers = function(results) {
    // update the markers array because of a filter query
    var index = 0,
        len = results.length;

    // clear the existing markers
    markers = [];

    // push the results to the array
    while (index < len) {
        this.addMarker(results[index]);
        index += 1;
    }
};

NeighborhoodGmap.prototype.hideMarker = function(index) {
    // hide a marker from the page view
    return this.markers[index].setMap(null);
};

NeighborhoodGmap.prototype.showMarker = function(index) {
    // add a marker from the markers array
    return markers[index].setMap(map);
};

NeighborhoodGmap.prototype.toggleMarkers = function(visibility) {
    // show or hide all of the markers on the page view
    // depending on the value of: visibility<boolean>
    var index = 0,
        markers = this.markers,
        len = this.len;

    while (index < len) {
        if (visibility) {
            this.showMarker(index);
        } else {
            this.hideMarker(index)
        }
        index += 1;
    }
};

NeighborhoodGmap.prototype.initMap = function() {
    var index = this.index,
        len = this.len,
        results = this.results,
        location = {
        lat: this.origLat,
        lng: this.origLng
    };

    map = new google.maps.Map(this.mapDiv, {
        zoom: 16,
        center: location,
    });

    // add the markers
    while (index < len) {
        this.addMarker(results[index]);

        index += 1;
    }

    // will hide status if 'success' upon loading data
    this.showStatus();
};