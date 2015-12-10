
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
        $city    = $('#city').val(),
        $address = $city + ', ' + $street;

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

        // update the greeting
        $greeting.text('So, you want to live at: ' + $address);

        // NY Times API
        var $nytApiKey = 'api-key=0f4df9e641f30618fc99f9edbf7677df:8:73715864',
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

        // Wiki API
        var $wikiURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' +
                $city + '&format=json&callback=wikiCallback';

        $.ajax( {
            url: $wikiURL,
            dataType: 'jsonp',
            success: function(data) {
                var wikiURLStr = 'http://en.wikipedia.org/wiki/',
                    len = data[1].length,
                    title = data[1],
                    url = data[3],
                    i;

                for (i = 0; i < len; i += 1) {
                    $wikiElem.append('<li><a href="' + url[i] +
                        '" target="_blank">' + title[i] + '</a></li>');
                }
            }
        }).error(function(e) {
                $wikiElem.append('<li>No data available.</li>');
        });
    }

    return false;
};

$('#form-container').submit(loadData);
