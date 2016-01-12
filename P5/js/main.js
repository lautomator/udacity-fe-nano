// contains the data and filter functions
var viewModel = {
    // the data model: default search term and results
    place: ko.observable('Queen Village, Philadelphia, PA'),
    lat: ko.observable(39.9383886),
    lng: ko.observable(-75.1531351),
    placeType: ko.observable('restaurant'),
    placeRadius: ko.observable(500),
    queries: ko.observableArray([]),
    results: ko.observableArray([]),
    entryStatus: ko.observable(),

    // app functions
    filter: function() {
        // Gets valid form data and filters the results.
        // Returns a list with the results, if any
        var submittedQuery = $('.map_api_search').val(),
            currentResults = this.results(),
            len = currentResults.length,
            index = 0,
            submitted,
            searchPattern,
            missed = 0,
            filtered = [];

        // reports warnings
        this.entryStatus('');

        // filter only if validation is passed
        if (this.validate(submittedQuery)) {

            // trim any trailing white space and democratize
            submitted = submittedQuery.trim().toLocaleLowerCase();

             // add to the queries array
            this.queries().push();

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
            }

        } else {
            this.entryStatus('invalid input');
        }

        return filtered;
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
    }
};

ko.applyBindings(viewModel);
