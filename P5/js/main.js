// model
var data = [
    {
        query:   'NYC Subways', // default search term
        results: [] // resulting titles (10 max)
    }
];

// controller
var ViewModel = function() {

    this.searchQuery = ko.observable(data.query); // search term
    this.searchResults = ko.observableArray(data.results);

};

ko.applyBindings(new ViewModel());
