// ********************
// * Model example #2 *
// ********************

// the model
var Poll = Backbone.Model.extend({
    // default data
    defaults: {
        ans1: 'red',
        ans2: 'blue',
        ans3: 'green',
        ans4: 'orange',
        ans5: 'none of the above',
        completed: false
    },
    // validation
    validate: function(attributes) {
        if (attributes.question === undefined) {
            return 'need to set a question';
        }
    },
    // init
    initialize: function() {
        console.log('init');

        // error handling
        this.on('invalid', function(model, error) {
            console.log(error);
        });

        // Listen for any changes to the model
        this.on('change', function() {
            console.log('values for this model have been changed');
        });

        // or listen for a change to one attribute only
        this.on('change:ans5', function() {
            console.log('the value of answer 5 changed to ');
        });
    }
});


// create an instance of the model
var p1 = new Poll({
    // redefine a default
    ans3: 'purple'
});

// or 'set' it this way, after instantiation
p1.set({
    ans3: 'violet'
});

// backbone 'get' method
console.log(p1.get('ans3'));

p1.set({
    ans5: 'all of the above'
});

// p1.set('question', 'What is your favorite color?');
p1.set('completed', true, { validate: true }); // validation error because 'question' is not set
console.log('completed: ' + p1.get('completed'));



// the view
var PollView = Backbone.View.extend({
    tagName: 'li',

    // cache the template function for a single item
    pollTpl: _.template('an example template'),

    // events
    events: {
        'dblclick label': 'edit',
        'keypress .edit': 'updateOnEnter',
        'blur .edit': 'close'
    },

    initialize: function(options) {
        this.options = options || {};
    },

    render: function() {
        this.$el.html( this.pollTpl(this.model.attributes));
        this.input = this.$('.edit');
        return this;
    },

    edit: function() {
        // executed when label is double-clicked
    },

    close: function() {
        // executed when input loses focus
    },

    updateOnEnter: function(e) {
        // executed on enter
    }
});

var pollView = new PollView();
console.log(pollView.el);




// ********************
// * Model example #2 *
// ********************

// direct access -> Listen for changes in the model
var Person = new Backbone.Model({
    defaults: {
        name: 'Jane'
    }
});

// validate the model attr: name
Person.validate = function(attrs) {
    if (!attrs.name) {
        return 'Please enter your name';
    }
};

Person.on('change:name', function() {
    console.log('name changed');
})

Person.set({
    name: 'John'
});

Person.set({
    name: 'Fred'
},
{
    silent: true // change will not log
});

console.log(Person.hasChanged('name')); // returns boolean
console.log(Person.hasChanged(null)); // anything changed

console.log(Person.get('name'));

console.log(Person.unset('name', { validate: true })); // false

