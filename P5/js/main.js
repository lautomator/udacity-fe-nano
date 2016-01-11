// model
var model = {
        query:   'NYC Subways', // default search term
        results: [] // titles returned
    };

// controller
var ViewModel = function(data) {

    var self = this;

    self.searchTerm = ko.observable(model.query);
    self.searchResults = ko.observableArray(data.results);

    this.filterQuery = function() {
        // updates the data model with the new query

        // get the value from the input area
        var submittedQuery = $('.map_api_search').val();

        // update the model
        model.query = submittedQuery;

        console.log(model.query);
        console.log(self.searchTerm());

    }



};

ko.applyBindings(new ViewModel(model));
