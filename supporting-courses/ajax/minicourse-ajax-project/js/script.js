
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // clear error message, if any
    if ($('#messages').hasClass('has_warning')) {
        $('#messages').removeClass('has_warning');
        $('#messages').addClass('no_display');
    }

    // get the values of the form request
    var $street  = $('#street').val(),
        $city    = $('#city').val();

    // check that the fields are not blank
    if ($street === '' && $city === '') {
        // one or more of the fields contain
        // and empty string -- return the warning
        $('#messages').removeClass('no_display');
        $('#messages').addClass('has_warning');

    } else {
        // get the picture using google maps API
        var $googlePic = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + $street + ',' + $city,
            $backgroundImage = '<img class="bgimg" src="' + $googlePic + '">';

            // just a check ... (Preserve the log in the console to see the value)
            console.log($backgroundImage);

        // append the image to the body
        $body.append($backgroundImage);
    }

    return false;
};

$('#form-container').submit(loadData);
