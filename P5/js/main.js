// THIS IS TEMPORARY
// The following is fake data that would be passed from an API
// The API is called once and stored in a master var
var data = {
    origin: 'Queen Village, Philadelphia, PA',
    locations: [
        {
            name: 'test1',
            address: 'add 1'
        },
        {
            name: 'test2',
            address: 'add 2'
        }
    ],
    geoCoords: {
        lat: 39.9383886,
        lng: -75.1531351
    },
    qType: 'restaurant',
    radius: 500,
    appStatus: ''
};
// fake data ends ============================================

var viewModel = {
    // the data model: default search term and results
    place: ko.observable(),
    lat: ko.observable(),
    lng: ko.observable(),
    placeType: ko.observable(),
    placeRadius: ko.observable(),
    listings: ko.observableArray(),
    entryStatus: ko.observable(),

    // app functions
    loadData: function() {
    // loads data from the API and populates the names array
        var placesKey = 'AIzaSyDg_zRxIh9QfvEedhbI0eBh9Nz-fV94Ogw',
            placesURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
            data.geoCoords.lat + ',' +
            data.geoCoords.lng + '&radius=' +
            data.radius + '&types=' +
            data.qType + '&key=' + placesKey;

        $.getJSON(placesURL, function(d) {
            // we just need the names of the places for now
            // TODO: will need the address information for the markers
            $.each(d.results, function() {
                console.log(this.name);

            }).error(function(e) {
                // update app status on error
                data.appStatus = 'no data available';
            });
        });
    },
    filter: function(val) {
        // Gets valid form data and filters the results.
        // Returns a list with the results, if any
        var submittedQuery = $('.map_api_search').val(),
            currentResults = this.listings(),
            len = currentResults.length,
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

                if (currentResults[index].toLocaleLowerCase().search(submitted) !== -1 ) {
                    // push to the filtered results
                    filtered.push(currentResults[index]);

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
    getLocations: function(loc) {
        // gets the first ten places from the search
        var places = loc,
            len = places.length,
            max = 10,
            index = 0,
            results = [];

        if (len > max) {
            while (index < max) {
                results.push(places[index].name);
                index += 1;
            }
        } else {
            // get whatever is available
            while (index < len) {
                results.push(places[index].name);
                index += 1;
            }
        }

        return results;
    },
    refresh: function() {
        // refresh the data on the fly
        var textInput = $('.map_api_search').val();

        if (textInput === '') {
            this.listings(this.getLocations(data.locations));
        }
    },
    reset: function() {
        // remove warnings
        this.entryStatus('');
        // clear the form
        $('.map_api_search').val('');
        // reset the listings
        this.listings(this.getLocations(data.locations));
    },
    init: function() {
        // load the data from the API
        this.loadData();
        // populate the observables (above) with the data
        this.place(data.origin);
        this.lat(data.geoCoords.lat);
        this.lng(data.geoCoords.lng);
        this.placeType(data.qType);
        this.placeRadius(data.radius);
        this.listings(this.getLocations(data.locations));
    }
};

ko.applyBindings(viewModel);
viewModel.init();