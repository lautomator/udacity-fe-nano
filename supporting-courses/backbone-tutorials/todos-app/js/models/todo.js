var app = app || {};

// Todo Model
// attrs:
// -> title <string>
// -> completed <boolean>
app.Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        complete: false
    },

    // toggle the 'completed' state when appropriate
    toggle: function() {
        this.save({
            completed: !this.get('completed')
       });
    }
});