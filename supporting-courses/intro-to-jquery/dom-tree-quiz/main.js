/*
For this quiz, you'll need to add to the DOM tree that already exists.

'#family2' should be a sibling of and come after '#family1'. '#bruce' should be the only immediate child
of '#family2'. '#bruce' should have two <div>s as children, '#madison' and '#hunter'.
*/

    var family1 = $('#family1'),
        family2Html = "<!-- family2 --><div id='family2'></div>";
    // create div for family 2
    $(family2Html).insertAfter(family1);

    // insert all of the elements into family 2
    $('#family2').append('<h1>Family2</h1>');
    $('#family2').append('<div id="bruce"></div>');

    $('#bruce').append('<h2>Bruce</h2>');
    $('#bruce').append('<div id="madison"></div>');
    $('#bruce').append('<div id="hunter"></div>');

    $('#madison').append('<h3>Madison</h3>');
    $('#hunter').append('<h3>Hunter</h3>');
