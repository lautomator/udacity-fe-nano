var catClickerTheGame = function(targets) {

    // model layer
    var data = {
        // [cat name <str>, current number of clicks <int>]
        cats: [
            ['alice', 0],
            ['bam-bam', 0],
            ['barney', 0],
            ['coco', 0],
            ['pebbles', 0],
            ['wilma', 0]
        ],
        update: function(catPos, clicks) {
            // update the cats array
            this.cats[catPos][1] = clicks;
        },
        toString: function() {
            // logs human readable data in the console
            var i = 0,
                catsLength = this.cats.length,
                nameLabel = 'name:\t',
                clicksLabel = 'clicks:\t';

            while (i < catsLength) {
                console.log(nameLabel + this.cats[i][0] + '\t\t|\t' +
                    clicksLabel + this.cats[i][1]);
                i += 1;
            }
            console.log('\n...\n');
        }
    };

    // controller layer
    var octopus = {
        init: function() {
            // call to render the buttons
            buttonsView.render(data);

            // call to render the selected cat
            catsView.render(data);
        },
        getCats: function() {
            // returns the cats from the data model
            var cats = data.cats;
                return cats;
        },
        getClicks: function(catPos) {
            // returns the current number of clicks <int>
            return data.cats[catPos][1];

        },
        addClick: function(catPos, clicks) {
            // get the current number of clicks
            // and update the data
            data.update(catPos, clicks);

            // see the data in the console:
            data.toString();
        }
    };

    // view layer for the buttons
    var buttonsView = {
        context: function() {
            // returns the template and data
            var template = $(targets.buttonsTemplate).html(),
                data = octopus.getCats(),
                context = [template, data];

                return context;
        },
        render: function() {
            var i = 0,
                context = this.context(),
                template = context[0],
                cats = context[1],
                catsLength = cats.length;

            while (i < catsLength) {
                // render the cat buttons from the context
                $('.cat-choices').append(template.replace(/{{catName}}/g, cats[i][0]));

                i += 1;
            }
        }
    };

    // view layer for the cats
    var catsView = {
        context: function() {
            var template = $(targets.catViewTemplate).html(),
                data = octopus.getCats(),
                context = [template, data];

                return context;
        },
        render: function() {
            // render the selected cat, the name, and number of clicks
            var i = 0,
                context = this.context(),
                template = context[0],
                cats = context[1],
                catsLength = cats.length;

            while (i < catsLength) {
                var buttonId = document.getElementById(cats[i][0]),
                    catId = 'cat-' + cats[i][0],
                    catName = cats[i][0];

                // listen for a click to render the cat
                buttonId.addEventListener('click', (function(catName, i, catId) {
                    return function() {
                        // insert data into the template
                        var html = template.replace(/{{catName}}/g, cats[i][0]),
                            html = html.replace(/{{getClicks}}/g, octopus.getClicks(i));

                        // render the template
                        $('.cat-display-area').html(html);

                        // target the cat being clicked in the cat view area (not the button)
                        var catClickId = document.getElementById(catId),
                            clicks = octopus.getClicks(i);

                        // counts the clicks and displays them
                        catClickId.addEventListener('click', (function(clicks) {
                            return function() {
                                var clickCountId = '#click-' + catName;
                                clicks += 1;
                                $(clickCountId).text(clicks);

                                // add to the total number of clicks
                                octopus.addClick(i, clicks);
                            };
                        })(clicks));
                    };
                })(catName, i, catId));

                i += 1;
            }
        }
    };

    octopus.init();

} // end of the game function