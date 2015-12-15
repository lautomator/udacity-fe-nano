var catClickerTheGame = function (){

    var cats = ['wilma', 'barney'],
        catsLength = cats.length,
        i = 0,
        clicks = 0;

    // this is an alternate method
    function catClicker(target, cat, clicks) {
        // increments the clicks for a cat
        target.addEventListener('click', function() {
            clicks += 1;
            // console.log(clicks);
            $(cat).text(clicks);

            return false;
        });
    }

    // render some cats
    while (i < catsLength) {

        $('.container').append('<div class="row">' +
                    '<div class="col-md-6">' +
                        '<h2 class="cat-name">' + cats[i] + '</h2>' +
                        '<img class="img-responsive cat-pic" id="cat-' + i +
                        '" src="img/' + cats[i] + '.jpg" alt="cat">' +
                    '</div>' +
                    '<div class="col-md-6 clicks">' +
                        '<h2>Number of clicks: ' +
                        '<span class="numbers" id="' + cats[i] +
                        '">0</span></h2></div></div><hr>');

        var clickID = document.getElementById('cat-' + i),
            cat = '#' + cats[i];

        // listen for clicks
        clickID.addEventListener('click', (function(cat, clicks) {
            return function() {
                // increment the clicks
                clicks += 1;

                // display the amount of clicks
                $(cat).text(clicks);
            };
        })(cat, clicks));

        // my alternate method
        // catClicker(clickID, cat, clicks);

        i += 1;
    }
}