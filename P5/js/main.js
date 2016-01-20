// The following is data pulled from the FourSquare API
// https://foursquare.com/
// The API is called once and stored in a master var ('data')
var data = {
    // The origin, radius, and limit could be set by the user.
    // For now, these are hardcoded.
    origin: 'Queen Village, Philadelphia, PA',
    locations: [], // all of the objects from the API
    labels: [], // just the venue names
    geoCoords: {
        lat: 39.9383886,
        lng: -75.1531351
    },
    section: 'food',
    radius: 500,
    limit: 15,
    appStatus: 'fetching data...',
    v: '20160115',
    clientID: keys.cid,
    clientSecret: keys.cse,
    local: true // set to true for local development
};

var viewModel = {
    // from the data model
    place: ko.observable(),
    lat: ko.observable(),
    lng: ko.observable(),
    placeType: ko.observable(),
    placeRadius: ko.observable(),
    currentLocations: ko.observableArray(), // current API objects (venues)
    currentLabels: ko.observableArray(), // current names only
    status: ko.observable(),
    entryStatus: ko.observable(),

    // app functions
    loadData: function() {
        // loads data from the FoursSquare API and populates the
        // locations and names data objects
        var venuesURL = 'https://api.foursquare.com/v2/venues/explore?' +
            'll=' + this.lat() + ',' + this.lng() +
            '&radius=' + this.placeRadius() +
            '&section=' + this.placeType() +
            '&limit=' + data.limit +
            '&client_id=' + data.clientID +
            '&client_secret=' + data.clientSecret +
            '&v=' + data.v,
            // the timeout function
            $requestTimeout = setTimeout(function() {
                // update the status
                viewModel.status('Failed to get resource: timed out');
            }, 8000);

        // do not perform the request if working locally to debug
        if (!data.local) {
            // the async request
            $.ajax({
                url: venuesURL,
                dataType: 'json',
                success: function(d) {
                    var index = 0,
                        len = d.response.groups[0].items.length,
                        names = [],
                        name,
                        entry;

                    if (len === 0) {
                        // update the status
                        viewModel.status('No data available');
                    } else {

                        while (index < len) {
                            name = d.response.groups[0].items[index].venue.name;

                            // populate the labels array and add to the model
                            names.push(name);
                            data.labels.push(name);

                            // add the api data to the locations object in the data model
                            data.locations.push(d.response.groups[0].items[index]);

                            index += 1;
                        };

                        // add the names to the currentLabels that are viewed on the screen
                        viewModel.currentLabels(data.labels);

                        // define the current results
                        viewModel.currentLocations(data.locations);

                        // update the status
                        viewModel.status('success');
                        data.appStatus = 'success';

                        // load the map
                        viewModel.loadMap();

                    }
                    clearTimeout($requestTimeout);
                }
            });
        } else {
            loadTestData();
        }
    },
    loadMap: function() {
        // create a new map object
        gmap = new NeighborhoodGmap();

        // draw the map
        gmap.initMap();
    },
    updateMap: function(updates) {
        // clears the markers first before
        //the markers array has been updated
        gmap.toggleMarkers(false);
        // sends the filtered locations to the map
        gmap.updateMarkers(updates);

    },
    resetMap: function(locations) {
        // resets the markers to the default state
        gmap.toggleMarkers(false);
        gmap.updateMarkers(locations);
    },
    filter: function(val) {
        // Gets valid form data and filters the results.
        // Returns a list with the results, if any
        var submittedQuery = $('.map_api_search').val(),
            labels = this.currentLabels(),
            locations = this.currentLocations(),
            len = labels.length,
            index = 0,
            submitted,
            missed = 0,
            filteredLabels = [],
            filteredLocations = [];

        // reports warnings
        this.entryStatus('');

        // filter only if validation is passed
        if (this.validate(submittedQuery)) {

            // trim any trailing white space and democratize
            submitted = submittedQuery.trim().toLocaleLowerCase();

            // check to see if the search term appears
            // in the current results
            while (index < len) {

                if (labels[index].toLocaleLowerCase().search(submitted) !== -1 ) {
                    // push to the filteredLabels results
                    filteredLabels.push(labels[index]);

                    // update the currentLocations
                    filteredLocations.push(locations[index])

                } else {
                    missed += 1;
                }

                index += 1;
            }

            // report no results
            if (missed === len || submitted === '') {
                this.entryStatus('no results found');
            } else {
                // there are results: ok to update
                this.updateLabels(filteredLabels);
                this.updateLocations(filteredLocations);
                // update the markers
                this.updateMap(filteredLocations);
            }

        } else {
            this.entryStatus('invalid input');
        }
    },
    validate: function(q) {
        // filter unwanted chars: returns true if valid
        var isValid = true,
            invalidChars = /[\\#\$%\^\*\[\]\{\}<>\?\/\"\"]/;

        // user input should contain valid chars, as defined above
        if (q.match(invalidChars)) {
            isValid = false;
        }

        return isValid;
    },
    updateLabels: function(filtered) {
        // updates the currentLabels array based on the filter query
        this.currentLabels(filtered);
    },
    updateLocations: function(filtered) {
        // updates the currentLocations array based on the filter query
        this.currentLocations(filtered);
    },
    refresh: function() {
        // refresh the data on the fly
        var textInput = $('.map_api_search').val();

        if (textInput === '') {
            this.currentLabels(data.labels);
            this.currentLocations(data.locations);

            // allow the map to refresh only after it has loaded
            if (data.appStatus === 'success') {
                this.resetMap(data.locations);
            }
        }
    },
    reset: function() {
        // remove warnings
        this.entryStatus('');
        // clear the form
        $('.map_api_search').val('');
        // reset the currentLabels
        this.currentLabels(data.labels);
        this.currentLocations(data.locations);
        this.resetMap(data.locations);
    },
    init: function() {
        // populate the observables (above) with the data
        this.place(data.origin);
        this.lat(data.geoCoords.lat);
        this.lng(data.geoCoords.lng);
        this.placeType(data.qType);
        this.placeRadius(data.radius);
        this.status(data.appStatus);
        this.loadData();
    }
};

ko.applyBindings(viewModel);
viewModel.init();