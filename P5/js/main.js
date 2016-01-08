// model
var model = {
        query:   'NYC Subways', // default search term
        results: [] // titles returned
    };

// controller
var ViewModel = function(data) {

    var self = this;

    self.searchTerm = ko.observable(data.query);
    self.searchResults = ko.observableArray(data.results);

    self.filter = function() {
        console.log('filtered');
    }

};

ko.applyBindings(new ViewModel(model));
