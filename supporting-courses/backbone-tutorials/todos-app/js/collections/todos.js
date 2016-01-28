var app = app || {};

// Todo Collection
// The Todo model is saved to localStorage
// as opposed to a server

var TodoList = Backbone.Collection.extend({

    // the model
    model: app.Todo,
    localStorage: new Backbone.LocalStorage('todos-backbone'),

    // filters through the finished items
    completed: function() {
        return this.filter(function(todo) {
            return todo.get('completed');
        });
    },

    // filters the remaining items
    remaining: function() {
        return this.without.apply(this, this.completed());
    },

    // todos are kept in sequential order
    // this will generate the next order number
    nextOrder: function() {
        if (!this.length) {
            return 1;
        }
        return this.last().get('order') + 1;
    },

    // todos are sorted by their original insertion order
    comparator: function(todo) {
        return todo.get('order');
    }
});

app.Todos = new TodoList();