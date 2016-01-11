$(document).ready(function() {
    // This script handles initial page rendering details
    // and the Google MAps API.

    var isDesktop = false,
        searchForm = neighborhoodMapTargets.searchFormTemplate,
        searchTemplate = $(searchForm).html(),
        mapdiv = neighborhoodMapTargets.mapDiv,
        map,
        infowindow;

    function detectBrowser() {
        // scale the map div window based on device
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

    // Google maps/places functions
    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    }

    function processResults(results, status, pagination) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
            return;
        } else {
            createMarkers(results);

            // if (pagination.hasNextPage) {
            //     var moreButton = document.getElementById('more');

            //     moreButton.disabled = false;

            //     moreButton.addEventListener('click', function() {
            //         moreButton.disabled = true;
            //         pagination.nextPage();
            //     });
            // }
        }
    }

    function createMarkers(places) {
        var bounds = new google.maps.LatLngBounds();
        // var placesList = document.getElementById('map');

        for (var i = 0, place; place = places[i]; i++) {
            var image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            var marker = new google.maps.Marker({
                map: map,
                icon: image,
                title: place.name,
                position: place.geometry.location
            });

            // placesList.innerHTML += '<li>' + place.name + '</li>';

            bounds.extend(place.geometry.location);
        }
        // map.fitBounds(bounds);
    }

    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
    }

    function initMap() {
        // renders the Google map
        var geoLocation = new google.maps.LatLng(39.9383886, -75.1531351),
            map = new google.maps.Map(mapdiv, {
            center: geoLocation,
            zoom: 16
        });

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);

        service.nearbySearch({
            location: geoLocation,
            radius: 100,
            types: ['store']
        }, processResults);
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