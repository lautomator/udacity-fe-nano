// contains the data and filter functions
var viewModel = {

    // the data model: default search term and results
    place: ko.observable('Queen Village, Philadelphia, PA'),
    lat: ko.observable(39.9383886),
    lng: ko.observable(-75.1531351),
    type: ko.observable('Restaurants'),
    query:   ko.observable(''),
    results: ko.observableArray([]),
    entryStatus: ko.observable(''),

    // app functions
    filter: function() {
        // gets valid form data and updates the results
        var submittedQuery = $('.map_api_search').val();

        this.entryStatus('');

        // filter only if validation is passed
        if (this.validate(submittedQuery)) {
            // trim any trailing white space and filter the model
            console.log(submittedQuery.trim());

            this.query(submittedQuery.trim());
            // TODO: the results will be added to the results data
            // and the view will be updated

        } else {
            this.entryStatus('invalid input');
        }


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
