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

        // hide the results after a result is clicked in mobile view
        $('#mobile_results').click(function() {
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

/* ---------
    The Map
   --------- */
// The Google Maps API is used, in part, here:
// https://developers.google.com/maps/?hl=en
var NeighborhoodGmap = function() {
    // the map class
    this.map = '';
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
    // renders the markers on the map
    // with the info windows and adds
    // the markers to the markers array

    this.marker = new google.maps.Marker({
        position: {
            lat: result.venue.location.lat,
            lng: result.venue.location.lng
        },
        title: result.venue.name,
        map: map,
        icon: 'img/blue_marker.png'
    });

    // push the markers to the markers array
    this.markers.push(this.marker);

    // listen for clicks to open the info window
    this.marker.addListener('click', function() {
        // open the info window
        NeighborhoodGmap.prototype.toggleInfoWindow(result);
        // change the color of the marker
        NeighborhoodGmap.prototype.markerActive(this);
    });
};

NeighborhoodGmap.prototype.toggleInfoWindow = function(result) {
    // opens the info window selected
    var infowindow = new google.maps.InfoWindow({
        content: this.addInfoWindowTemplate(result),
        position: {
            lat: result.venue.location.lat + 0.0006,
            lng: result.venue.location.lng
        }
    });

    // check to see if the info window for this item is not already open
    if (viewModel.infoWindowOpen().indexOf(result.venue.name) === -1) {
        // open the info window for the current marker
        infowindow.open(map);

        viewModel.infoWindowOpen().push(result.venue.name);

        // listen for when the window is closed
        infowindow.addListener('closeclick', function() {
            viewModel.infoWindowOpen([]);

            // change the color of the marker
            NeighborhoodGmap.prototype.markerInactive(gmap.markers);
        });
    }
};

NeighborhoodGmap.prototype.addInfoWindowTemplate = function(result) {
    // returns the html template with venue data
    var place = result.venue,
        template,
        title = place.name,
        address = place.location.address,
        city = place.location.city,
        state = place.location.state,
        zip = place.location.postalCode,
        phone,
        menuUrl,
        link = '<a href="%data%" target="_blank">menu</a>';

    // check to see if there is a menu available
    if (place.hasMenu) {
        menuUrl = place.menu.url;
    } else {
        // perform a search query
        menuUrl = 'https://www.google.com/#safe=off&q=' +
            title + '+' + city + '+' + state + '+' + 'menu';
    }

    // check for a phone number
    if (place.contact.formattedPhone) {
        phone = place.contact.formattedPhone;
    } else {
        phone = '<i class="text-warning">information not available</i>';
    }

    // define the template
    template =  '<h4 class="bg-primary">' + title + '</h4>' +
                '<p>' + address + '<br>' +
                city + ', ' + state + ' ' + zip + '<br>' +
                phone + '<br>' +
                link.replace('%data%', menuUrl) + '</p>';

    return template;
};

NeighborhoodGmap.prototype.updateMarkers = function(updates) {
    // update the markers array because of a filter query
    var index = 0,
        len = updates.length;

    // clear the existing markers
    this.markers = [];

    // push the updates to the array
    while (index < len) {
        this.addMarker(updates[index]);
        index += 1;
    }
};

NeighborhoodGmap.prototype.hideMarker = function(index) {
    // hide a marker from the page view
    return this.markers[index].setMap(null);
};

NeighborhoodGmap.prototype.showMarker = function(index) {
    // show a marker from the markers array
    return this.markers[index].setMap(map);
};

NeighborhoodGmap.prototype.toggleMarkers = function(visibility) {
    // show or hide all of the markers on the page view
    // depending on the value of: visibility<boolean>
    var index = 0,
        markers = this.markers,
        len = markers.length;

    while (index < len) {
        if (visibility) {
            this.showMarker(index);
        } else {
            this.hideMarker(index);
        }
        index += 1;
    }
};

NeighborhoodGmap.prototype.markerActive = function(marker) {
    // changes the marker color to red (active)

    // check to see if this marker is not already active
    if (viewModel.infoWindowOpen().indexOf(marker.title) !== -1) {
        marker.icon = "img/red_marker.png";
        marker.setMap(map);
    } else {
        marker.icon = "img/blue_marker.png";
        marker.setMap(map);
    }
};

NeighborhoodGmap.prototype.markerInactive = function(markers) {
    // changes the marker color blue (ready)
    // get the current marker
    var index = 0,
        len = markers.length;

    while (index < len) {
        markers[index].icon = "img/blue_marker.png";
        markers[index].setMap(map);

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

    // add the markers and info windows
    while (index < len) {
        this.addMarker(results[index]);
        // this.addInfoWindow(results[index]);
        index += 1;
    }

    // will hide status if 'success' upon loading data
    this.showStatus();
};