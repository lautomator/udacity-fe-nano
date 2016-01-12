$(document).ready(function() {
    // This script handles initial page rendering details
    // and the Google MAps API.

    var isDesktop = false,
        qResults = neighborhoodMapTargets.resultsTemplate,
        resultsTemplate = $(qResults).html(),
        mapDiv = neighborhoodMapTargets.mapDiv,
        moreButton = neighborhoodMapTargets.moreButton,
        placesList = neighborhoodMapTargets.placesList,
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

    /* -----------------
        Google Maps API
       ----------------- */

    // Google maps/places functions
    function initMap() {
        // get the data to pass into the map service
        var params = viewModel;

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

        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: loc,
            radius: params.placeRadius(),
            types: [params.placeType()]
        }, processResults);
    }

    function processResults(results, status, pagination) {
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
    }

    function createMarkers(places) {
        // create the markers
        var bounds = new google.maps.LatLngBounds();

        for (var i = 0, place; place = places[i]; i++) {
            var image = {
                url: place.icon, //map.icon if you want pins
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

            // render the results on the page
            $(placesList).append(resultsTemplate.replace('%data%', place.name));

            // store these results in the data model
            viewModel.results().push(place.name);

            bounds.extend(place.geometry.location);
        }

        map.fitBounds(bounds);

    } // google maps API ends

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