function loadData() {

    var $body = $('body'),
        $wikiElem = $('#wikipedia-links'),
        $nytHeaderElem = $('#nytimes-header'),
        $nytElem = $('#nytimes-articles'),
        $greeting = $('#greeting'),
        $greetingMessage;

    // clear out old data before new request
    $wikiElem.text('');
    $nytElem.text('');

    // clear error message, if any
    if ($('#messages').hasClass('has_warning')) {
        $('#messages').removeClass('has_warning');
        $('#messages').addClass('no_display');
    }

    // get the values of the form request
    var $street  = $('#street').val(),
        $city    = $('#city').val(),
        $address =  $street + ', ' + $city;

    // check that the fields are not blank
    if ($street === '' && $city === '') {
        // one or more of the fields contain
        // and empty string -- return the warning
        $('#messages').removeClass('no_display');
        $('#messages').addClass('has_warning');

    } else {
        // get the picture using Google Maps API
        var $googlePic = 'https://maps.googleapis.com/maps/api/' +
                'streetview?size=600x300&location=' + $address,
            $backgroundImage = '<img class="bgimg" src="' + $googlePic + '">';

        // append the image to the body
        $body.append($backgroundImage);

        if ($street === '') {
            $greetingMessage = 'So, you want to live in: ' + $city;
        } else if ($city === '') {
            $greetingMessage = 'So, you want to live at: ' + $street;
        } else {
            $greetingMessage = 'So, you want to live at: ' + $address;
        }
        $greeting.text($greetingMessage);

        // NY Times API
        var $nytApiKey = 'api-key=THIS_IS_A_SECRET',
            $fq = 'source:("The New York Times") AND glocations.contains:("' + $city + '")',
            $NYTimesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=' +
                $fq + '&' + $nytApiKey;

        $.getJSON($NYTimesURL, function(data) {
            $.each(data.response.docs, function() {
            $nytElem.append('<li><a href="' + this.web_url +
                '" target="_blank">' + this.headline.main + '</a>' +
                '<br>' +  this.snippet + '</li>');
            });
        }).error(function(e) {
                $nytElem.append('<li>No data available.</li>');
        });
    }
    return false;
};

$('#form-container').submit(loadData);
