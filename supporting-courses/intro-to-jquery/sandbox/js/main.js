$(function() {

// toggleClass() and next()

    var selectedItem = $('.selected');

    selectedItem.toggleClass('selected');

    // target the next element and add the 'selected' class
    selectedItem.next().toggleClass('selected');


//.attr()

    // you can target an attribute to get its value
    // or assign a value to an attribute
    var selectedButton = $('.box-buttons').children().first(),
        link = selectedButton.find('a');

    console.log(link);
    link.attr('href', '#1');

// .html() and .text()

    // target everything in the container
    var page = $('.container'),
        allText = page.text(),
        allHTML = page.html();

    console.log(allText);
    console.log(allHTML);


});

