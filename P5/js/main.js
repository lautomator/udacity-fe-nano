// contains the data and update functions
var viewModel = {

    // the data model: default search terms and results
    query:   ko.observable('NYC Subways'),
    results: ko.observableArray([]),
    entryStatus: ko.observable(''),

    // app functions
    update: function() {
        // gets valid form data and updates the model
        var submittedQuery = $('.map_api_search').val();

        this.entryStatus('');

        // update only if validation is passed
        if (this.validate(submittedQuery)) {
            // trim any trailing white space and update the model
            this.query(submittedQuery.trim());
            // TODO: the results will be added to the results data

        } else {
            console.log(submittedQuery.trim());
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
