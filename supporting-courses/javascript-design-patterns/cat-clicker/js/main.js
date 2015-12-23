var catClickerTheGame = function(targets) {
    'use strict';
    // model layer
    var data = {
        cats: [
            {
                name:   'Alice',
                clicks: 0,
                imgSrc: 'img/alice.jpg',
                imgUrl: 'https://c2.staticflickr.com/6/5480/12139930183_86af1b262e_b.jpg'
            },
            {
                name:   'Bam-Bam',
                clicks: 0,
                imgSrc: 'img/bam-bam.jpg',
                imgUrl: 'https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454'
            },
            {
                name:   'Barney',
                clicks: 0,
                imgSrc: 'img/barney.jpg',
                imgUrl: 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496'
            },
            {
                name:   'Coco',
                clicks: 0,
                imgSrc: 'img/coco.jpg',
                imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Cute_grey_kitten.jpg/1024px-Cute_grey_kitten.jpg'
            },
            {
                name:   'Dino',
                clicks: 0,
                imgSrc: 'img/dino.jpg',
                imgUrl: 'https://lh3.ggpht.com/cesD31eroFxIZ4IEeXPAJkx_8i5-haU3P9LQosGNfV-GfAPUh2bE4iw4zV6Mc9XobWOR70BQh2JAP57wZlM=s0#w=640&h=480'
            },
            {
                name:   'Pebbles',
                clicks: 0,
                imgSrc: 'img/pebbles.jpg',
                imgUrl: 'https://lh4.ggpht.com/dUJNejPqb_qLsV1kfWcvviqc7adxsw02BSAm8YLWNklP4lI6fQCLKXd-28uKuchtjoEUpqFN0K6kkTSDHw=s0#w=588&h=640'
            },
            {
                name:   'Wilma',
                clicks: 0,
                imgSrc: 'img/wilma.jpg',
                imgUrl: 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426'
            }
        ],
        // this is the selected cat index
        selected: 0,
        updateClicks: function(catPos, clicks) {
            // update the cats array
            this.cats[catPos].clicks = clicks;
        },
        update: function(updates, catIndex) {
            // update the fields that have been changed
            this.cats[catIndex].name = updates[0];
            this.cats[catIndex].imgUrl = updates[1];
            this.cats[catIndex].clicks = updates[2];
        },
        toString: function() {
            // logs human readable data in the console
            var i = 0,
                catsLength = this.cats.length,
                nameLabel = 'name:\t',
                clicksLabel = 'clicks:\t',
                imgSrcLabel = 'source:\t',
                imgUrlLabel = 'url:\t';

            while (i < catsLength) {
                console.log(nameLabel + this.cats[i].name + '\t\t|\t' +
                    clicksLabel + this.cats[i].clicks + '\n' +
                    imgSrcLabel + this.cats[i].imgSrc + '\n' +
                    imgUrlLabel + this.cats[i].imgUrl);
                i += 1;
            }
            console.log('\n_____\n');
        }
    };

    // controller layer
    var octopus = {
        getCats: function() {
            // returns the cats from the data model <array>
            var cats = data.cats;
                return cats;
        },
        getClicks: function(catPos) {
            // returns the current number of clicks <int>
            return data.cats[catPos].clicks;

        },
        getSelectedCat: function() {
            // returns the current selected cat <array>
            var currentCat = data.selected,
                cat = data.cats[currentCat];
            return cat;
        },
        getSelectedIndex: function() {
            // returns the current selected cat <int>
            var selectedCat = data.selected;
            return selectedCat;
        },
        addClick: function(catPos, clicks) {
            // get the current number of clicks
            // and update the data
            data.updateClicks(catPos, clicks);
        },
        updateCat: function(catPos) {
            data.selected = (catPos);

            // see the data in the console:
            data.toString();
        },
        adminUpdate: function(postData, catIndex) {
            // updates the model based on info added to form:
            // right now, name is the only param I want to allow to be changed
            var name = postData[0],
                image = postData[1],
                clicks = postData[2],
                updates = [name, image, clicks];

            // update the data
            data.update(updates, catIndex);
            // update the page
            this.init();
        },
        init: function() {
            // render the view layers
            buttonsView.init();
            catsView.init();
            catsAdminView.init();
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
                catsLength = cats.length,
                html;

            // clear old data
            $('.cat-choices').html('');

            while (i < catsLength) {
                // render the cat buttons from the context
                html = template.replace(/%catName%/,
                    cats[i].name).replace(/%index%/, i);
                $('.cat-choices').append(html);

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
                currentCat = octopus.getSelectedCat(),
                buttonId,
                catId,
                catName,
                catImage,
                html,
                catClickId,
                clicks;

            // clear old data
            $('.cat-display-area').html('');

            while (i < catsLength) {
                buttonId = document.getElementById('btn-' + i);
                catId = 'cat-' + i;
                catName = cats[i].name;
                catImage = cats[i].imgSrc;

                // listen for a button click to render the cat
                buttonId.addEventListener('click', (function(catName, i, catId, catImage) {
                    return function() {
                        // insert data into the template
                        html = template.replace(/%catName%/g,
                            catName).replace(/%catImgSrc%/,
                            catImage).replace(/%getClicks%/,
                            octopus.getClicks(i)).replace(/%index%/g, i);

                        // render the template
                        $('.cat-display-area').html(html);
                        // show the admin button
                        $('#cat-admin-button').removeClass('is-hidden');
                        $('#cat-admin-button').addClass('is-visible');
                        // hide the admin area
                        $('.cat-admin-form').hide();
                        // reset the button value
                        $('#cat-admin-button').attr('value', 'admin');
                        // update the form status
                        $('#admin-form').removeClass('is-active');

                        // update the selected cat
                        octopus.updateCat(i);

                        // target the cat being clicked in the cat view area (not the button)
                        catClickId = document.getElementById(catId),
                        clicks = octopus.getClicks(i);

                        // counts the clicks and displays them
                        catClickId.addEventListener('click', (function(clicks) {
                            return function() {
                                var clickCountId = '#click-' + i;
                                clicks += 1;
                                $(clickCountId).text(clicks);

                                // add to the total number of clicks
                                octopus.addClick(i, clicks);

                                // if the admin panel is open:
                                // change the admin button to an update button
                                if ($('#admin-form').hasClass('is-active')) {
                                    $('#cat-admin-button').removeAttr('value');
                                    $('#cat-admin-button').attr('value', 'update');
                                }

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

    var catsAdminView = {
        context: function() {
            var template = $(targets.catAdminTemplate).html(),
                model = octopus.getSelectedCat(),
                context = [template, model];

                return context;
        },
        render: function() {
            var context = this.context(),
                template = context[0],
                currentCat = context[1];

            // render the admin panel with the current cat data
            $('.cat-admin-area').html(template.replace(/%catName%/g,
                currentCat.name).replace(/%ImgUrl%/g,
                currentCat.imgUrl).replace(/%getClicks%/, currentCat.clicks));

            // the form is active
            $('#admin-form').addClass('is-active');

            // listen for an update
            this.save();

            // listen for cancel
            this.cancel();
        },
        save: function() {
            var context = this.context(),
                catName = context[1].name,
                catClicks = context[1].clicks;

            // will write input to data model
            $('#cat-admin-button-save').click(function() {
                // Get the data from the fields and add them to an array.
                // There could be all kinds functions for validation here.
                var $name = $('#admin-cat-name').val(),
                    $image = $('#admin-cat-img').val(),
                    $clicks = catClicks,
                    catIndex = octopus.getSelectedIndex(),
                    postData = [$name, $image, $clicks];

                octopus.adminUpdate(postData, catIndex);

                // hide the admin area
                $('.cat-admin-form').hide();
                $('#admin-form').removeClass('is-active');
                // change the button back to admin in case an update was made
                $('#cat-admin-button').removeAttr('value');
                $('#cat-admin-button').attr('value', 'admin');
            });
        },
        cancel: function() {
            // cancel the admin panel
            $('#cat-admin-button-cancel').click(function() {
                // hide the admin area
                $('.cat-admin-form').hide();
                $('#admin-form').removeClass('is-active');
                // change the button back to admin
                $('#cat-admin-button').removeAttr('value');
                $('#cat-admin-button').attr('value', 'admin');
            });
        },
        init: function() {
            // render the admin form when the button is pressed
            $('#cat-admin-button').click(function() {
                catsAdminView.render();
            });
        }
    };

    octopus.init();

}; // end of the game function