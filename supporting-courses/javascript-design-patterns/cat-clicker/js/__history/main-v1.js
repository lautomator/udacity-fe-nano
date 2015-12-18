var catClickerTheGame = function (targets){

    var $cat            = targets.cat,
        $clicksCount    = targets.clicksCount,
        $NumClicks      = 0;

    // listen for clicks
    $($cat).click(function(e) {
        // count the clicks
        $NumClicks += 1;

        // display the amount of clicks
        $('#clicks-count').text($NumClicks);

    });
}