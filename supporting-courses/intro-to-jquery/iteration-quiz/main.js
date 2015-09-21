$(function(){

    /*
    For this quiz, use jQuery's each() method to iterate through the <p>s,
    calculate the length of each one, and add each length to the end of each <p>.

    Also, make sure you don't change the text inside each <p>, otherwise your
    lengths won't be correct!
    */

    // Your code goes here!

    // returns text of each element
    $('p').each(function() {
       $(this).append(' ', $(this).text().length);
    });


})