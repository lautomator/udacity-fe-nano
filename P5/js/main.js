// The following is data pulled from the FourSquare API
// https://foursquare.com/
// The API is called once and stored in a master var ('data')
var data = {
    // The origin, radius, and limit could be set by the user.
    // For now, these are hardcoded.
    origin: 'Queen Village, Philadelphia, PA',
    locations: {}, // all of the requested API data
    labels: [], // the names of the venues only
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
    clientSecret: keys.cse
};

var viewModel = {
    // from the data model
    place: ko.observable(),
    lat: ko.observable(),
    lng: ko.observable(),
    placeType: ko.observable(),
    placeRadius: ko.observable(),
    listings: ko.observableArray(),
    currentResults: ko.observableArray(),
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

        // the async request
        $.ajax({
            url: venuesURL,
            dataType: 'json',
            success: function(d) {
                var index = 0,
                    len = d.response.groups[0].items.length,
                    names = [],
                    entry;

                // add the api data to the locations object in the data model
                data.locations = d;

                if (len === 0) {
                    // update the status
                    viewModel.status('No data available');
                } else {

                    while (index < len) {

                        // populate the names array and the labels array (in the model)
                        names.push(d.response.groups[0].items[index].venue.name);
                        data.labels.push(d.response.groups[0].items[index].venue.name);

                        index += 1;
                    };
                    // update the status
                    viewModel.status('success');
                    data.appStatus = 'success';

                    // add the names to the listings that are viewed on the screen
                    viewModel.listings(names);

                    // define the current results
                    viewModel.currentResults(d);

                    // draw the map
                    appMap.init();

                }
                clearTimeout($requestTimeout);
            }
        });
    },
    filter: function(val) {
        // Gets valid form data and filters the results.
        // Returns a list with the results, if any
        var submittedQuery = $('.map_api_search').val(),
            currentNames = this.listings(),
            len = currentNames.length,
            index = 0,
            submitted,
            missed = 0,
            filtered = [];

        // reports warnings
        this.entryStatus('');

        // filter only if validation is passed
        if (this.validate(submittedQuery)) {

            // trim any trailing white space and democratize
            submitted = submittedQuery.trim().toLocaleLowerCase();

            // check to see if the search term appears
            // in the current results
            while (index < len) {

                if (currentNames[index].toLocaleLowerCase().search(submitted) !== -1 ) {
                    // push to the filtered results
                    filtered.push(currentNames[index]);

                } else {
                    missed += 1;
                }

                index += 1;
            }

            // redraw the map
            appMap.init();

            // report no results
            if (missed === len || submitted === '') {
                this.entryStatus('no results found');
            } else {
                // there are results: ok to update
                this.update(filtered);
            }

        } else {
            this.entryStatus('invalid input');
        }
    },
    update: function(filtered) {
        // updates the listings array based on the filter query
        this.listings(filtered);
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
    refresh: function() {
        // refresh the data on the fly
        var textInput = $('.map_api_search').val();

        if (textInput === '') {
            this.listings(data.labels);
        }
    },
    reset: function() {
        // remove warnings
        this.entryStatus('');
        // clear the form
        $('.map_api_search').val('');
        // reset the listings
        this.listings(data.labels);
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