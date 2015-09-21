/*

For this quiz, can you use this script, which is in the <head> of index.html,
to change the boring placeholder image to a picture of a cute puppy?

Remember, you'll need to pass a function into the jQuery object to run
when the document is ready.

Here's a URL for a picture of a puppy: http://placepuppy.it/350/150

Good luck!

*/

$(function() {
    $('img').attr('src', "http://placekitten.com/350/150");
});