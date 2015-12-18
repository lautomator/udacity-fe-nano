var catClickerTheGame = function(targets) {
    'use strict';
    // model layer
    var data = {
        cats: [
            {
                name:   'Alice',
                clicks: 0,
                imgSrc: 'img/alice.jpg'
            },
            {
                name:   'Bam-Bam',
                clicks: 0,
                imgSrc: 'img/bam-bam.jpg'
            },
            {
                name:   'Barney',
                clicks: 0,
                imgSrc: 'img/barney.jpg'
            },
            {
                name:   'Coco',
                clicks: 0,
                imgSrc: 'img/coco.jpg'
            },
            {
                name:   'Dino',
                clicks: 0,
                imgSrc: 'img/dino.jpg'
            },
            {
                name:   'Pebbles',
                clicks: 0,
                imgSrc: 'img/pebbles.jpg'
            },
            {
                name:   'Wilma',
                clicks: 0,
                imgSrc: 'img/wilma.jpg'
            }
        ],
        update: function(catPos, clicks) {
            // update the cats array
            this.cats[catPos].clicks = clicks;
        },
        toString: function() {
            // logs human readable data in the console
            var i = 0,
                catsLength = this.cats.length,
                nameLabel = 'name:\t',
                clicksLabel = 'clicks:\t';

            while (i < catsLength) {
                console.log(nameLabel + this.cats[i].name + '\t\t|\t' +
                    clicksLabel + this.cats[i].clicks);
                i += 1;
            }
            console.log('\n...\n');
        }
    };

    // controller layer
    var octopus = {
        getCats: function() {
            // returns the cats from the data model
            var cats = data.cats;
                return cats;
        },
        getClicks: function(catPos) {
            // returns the current number of clicks <int>
            return data.cats[catPos].clicks;

        },
        addClick: function(catPos, clicks) {
            // get the current number of clicks
            // and update the data
            data.update(catPos, clicks);

            // see the data in the console:
            data.toString();
        },
        init: function() {
            // render the view layers
            buttonsView.init();
            catsView.init();
        }
    };

    // view layer for the buttons
    var buttonsView = {
        context: function() {
            // returns the template and data
            var template = $(targets.buttonsTemplate).html(),
                model = octopus.getCats(),
                context = [template, model];

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
                $('.cat-choices').append(template.replace(/%catName%/g, cats[i].name));

                i += 1;
            }
        },
        init: function() {
            this.render();
        }
    };

    // view layer for the cats
    var catsView = {
        context: function() {
            var template = $(targets.catViewTemplate).html(),
                model = octopus.getCats(),
                context = [template, model];

                return context;
        },
        render: function() {
            // render the selected cat, the name, and number of clicks
            var i = 0,
                context = this.context(),
                template = context[0],
                cats = context[1],
                catsLength = cats.length,
                buttonId,
                catId,
                catName,
                catImage;

            while (i < catsLength) {
                buttonId = document.getElementById(cats[i].name);
                catId = 'cat-' + cats[i].name;
                catName = cats[i].name;
                catImage = cats[i].imgSrc;

                // listen for a click to render the cat
                buttonId.addEventListener('click', (function(catName, i, catId, catImage) {
                    return function() {
                        // insert data into the template
                        var html = template.replace(/%catName%/g,
                            catName).replace(/%catImgSrc%/,
                            catImage).replace(/%getClicks%/,
                            octopus.getClicks(i));

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
                })(catName, i, catId, catImage));

                i += 1;
            }
        },
        init: function() {
            this.render();
        }
    };

    octopus.init();

}; // end of the game function