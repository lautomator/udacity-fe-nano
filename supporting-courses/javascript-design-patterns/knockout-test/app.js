// a data model
var viewModel = {

    // my data
    lName: ko.observable('Merigliano'),
    fName: ko.observable('John'),
    enrolled: ko.observable('no'),

    update: function() {
    // updates the data with info passed into the form

        // get the values from the form
        var updatedFirstName = $('#f-name').val(),
            updatedLasttName = $('#l-name').val(),
            updatedEnrolled = 'no';

        // update only if valid input only
        if (this.validate(updatedFirstName, updatedLasttName)) {
            // update the model
            this.fName(updatedFirstName);
            this.lName(updatedLasttName);

            // get the value of the checkbox
            if($('#is-enrolled').is(':checked') === true) {
                updatedEnrolled = 'yes';
            }

            this.enrolled(updatedEnrolled);

        } else {
            console.log('invalid input');
        }


    },

    validate: function(fname, lname) {
        // returns true if valid data has been passed in
        var isValid = true,
            invalidChars = /[^a-z.]/i;

        // first and last names should contain valid chars, as defined above
        if (fname.match(invalidChars) || fname === '' ||
            lname.match(invalidChars) || lname === '') {

            isValid = false;
        }

        return isValid;
    }

};


// activate the data model
ko.applyBindings(viewModel);
