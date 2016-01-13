// THIS IS TEMPORARY
// The following is fake data that would be passed from an API
// The API is called once and stored in a master var
var data = {
    origin: 'Queen Village, Philadelphia, PA',
    results: [
        "Southwark Restaurant",
        "Jim's Steaks South St.",
        "Sabrina's Cafe",
        "Ralph's Italian Restaurant",
        "Creperie Beau Monde",
        "Blackbird Pizzeria",
        "Bibou",
        "Famous 4th Street Delicatessen",
        "Lorenzo & Son Pizza",
        "Royal Tavern",
        "Percy Street Barbecue",
        "Italian Market Visitor Center",
        "La Fourno Ristorante Trattoria",
        "Ishkabibble's",
        "O'neal's Pub",
        "Essene Market & Cafe'",
        "Brauhaus Schmitz",
        "Saloon Restaurant",
        "Marrakesh",
        "Bistrot La Minette"
    ],
    geoCoords: {
        lat: 39.9383886,
        lng: -75.1531351
    },
    qType: 'restaurant',
    radius: 500
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
    filter: function() {
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
            if (missed === len) {
                this.entryStatus('no results found');
            } else {
                // there are results: ok to update
                this.update(filtered);
                console.log(filtered);
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
        if (q.match(invalidChars) || q === '') {
            isValid = false;
        }

        return isValid;
    },
    getListings: function(data) {
        // gets the first ten places from the search
        var places = data, // this is temp data
            len = places.length,
            max = 10,
            index = 0,
            results = [];

        // get the first ten results
        if (len > max) {
            while (index < max) {
                results.push(places[index]);
                index += 1;
            }
        } else {
            // get the results
            results = places;
        }

        return results;
    },
    init: function() {
        // populate the observables (above) with the data
        this.place(data.origin);
        this.lat(data.geoCoords.lat);
        this.lng(data.geoCoords.lng);
        this.placeType(data.qType);
        this.placeRadius(data.radius);
        this.listings(this.getListings(data.results));
    }
};

ko.applyBindings(viewModel);
viewModel.init();