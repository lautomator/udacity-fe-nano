var catClickerTheGame = function (){

    var cats = ['alice', 'bam-bam', 'barney', 'coco', 'wilma'],
        catsLength = cats.length,
        i = 0,
        j = 0,
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

    // create the cat buttons
    while (i < catsLength) {

        $('.cat-choices').append('<input class="btn btn-default"' +
            'type="button" value="' + cats[i] + '" id="' + cats[i] + '">');

        var buttonId = document.getElementById(cats[i]),
            catName = cats[i],
            catId = 'cat-' + catName;

        // displays the selected cat
        buttonId.addEventListener('click', (function(catName, catId) {
            return function() {
                $('.cat-display-area').html('<div class="row">' +
                    '<div class="col-md-6">' +
                    '<h2 class="cat-name">' + catName + '</h2>' +
                    '<img class="img-responsive cat-pic" id="cat-' + catName +
                    '" src="img/' + catName + '.jpg" alt="cat">' +
                    '</div>' +
                    '<div class="col-md-6 clicks">' +
                    '<h2>Number of clicks: ' +
                    '<span class="numbers" id="click-' + catName +
                    '">0</span></h2></div></div>'
                );
                var catClickId = document.getElementById(catId);

                // counts the clicks and displays them
                catClickId.addEventListener('click', (function(clicks) {
                    return function() {
                        var clickCountId = '#click-' + catName;
                        clicks += 1;
                        $(clickCountId).text(clicks);
                    };
                })(clicks));
            };
        })(catName, catId));

        i += 1;
    }
}