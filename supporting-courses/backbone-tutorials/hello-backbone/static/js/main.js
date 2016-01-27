(function($){

    // override persistent storage
    Backbone.sync = function(method, model, succes, error) {
        success();
    }

    // the model
    var Item = Backbone.Model.extend({
        defaults: {
            apples: 'apples',
            pears: 'pears',
            bananas: 'bananas'

        }
    });

    // array of model objects and helpers
    var List = Backbone.Collection.extend({
        model: Item
    });

    // the views
    var ItemView = Backbone.View.extend({
        tagName: 'li',

        events: {
            'click span.swap': 'swap',
            'click span.delete': 'remove'
        },

        initialize: function() {
            _.bindAll(this, 'render', 'unrender', 'swap', 'remove');

            this.model.bind('change', this.render);
            this.model.bind('remove', this.unrender);
        },

        render: function() {
            $(this.el).html('<span style="color: black;">' + this.model.get('apples') + ' ' +
                this.model.get('pears') + ' ' +
                this.model.get('bananas') + '</span>' + ' ' +
                '<span class="swap" style="color: blue; cursor: pointer;">[swap]</span> ' +
                '<span class="delete" style="color: red; cursor: pointer;">[del]</span>');

            return this;
        },

        unrender: function() {
            $(this.el).remove();
        },

        swap: function() {
            var swapped = {
                apples: this.model.get('pears'),
                pears: this.model.get('bananas'),
                bananas: this.model.get('apples')
            }

            this.model.set(swapped);
        },

        remove: function() {
            this.model.destroy();
        }
    });


    var ListView = Backbone.View.extend({
        // targets
        el: $('.main'), // attaches `this.el` to an existing element.

        events: {
            'click button#add': 'addItem',
            'click button#subtract': 'subtractItem'
        },

        initialize: function(){
            _.bindAll(
                this,
                'render',
                'addItem',
                'subtractItem',
                'appendItem'
            ); // fixes loss of context for 'this' within methods

            this.collection = new List();
            this.collection.bind('add', this.appendItem); // collection event binder

            this.counter = 0;

            this.render(); // not all views are self-rendering. This one is.
        },

        render: function(){
            $(this.el).append("<button id='add'>Add list item</button>&emsp;");
            $(this.el).append("<button id='subtract'>Remove list item</button>");
            $(this.el).append("<ul></ul>");

            // in case collection is not empty
            _(this.collection.models).each(function(item){
                self.appendItem(item);
            }, this);
        },

        addItem: function() {
            // remove any warnings
            $('.has_warning').addClass('is_hidden').text('');

            this.counter += 1;

            var item = new Item();
            item .set({
                pears: item.get('pears') + ' count: ' + this.counter
            });

            this.collection.add(item);
        },

        appendItem: function(item) {
            var itemView = new ItemView({
                model: item
            });

            $('ul', this.el).append(itemView.render().el);
        },

        subtractItem: function() {
            if (this.counter > 0) {
                this.counter -= 1;
                $('li', this.el).last().remove();
            } else {
                $('.has_warning').removeClass('is_hidden').text('Nothing to remove');
            }
        }
    });

    // listView instance: Instantiate main app view.
    var listView = new ListView();

})(jQuery);