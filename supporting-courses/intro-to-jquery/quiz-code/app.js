/*
For this quiz, use articleList and DOM navigation methods to collect articleList's
sibling <h1> (var h1), children (var kids), and parent <div>s (var parents).

You must use articleList to navigate to the element(s)!
*/

// Start with these variable!
// var articleList, h1, kids, parents;

// articleList = $('.article-list');

// h1 = articleList.siblings('h1');

// kids = articleList.find('*');

// parents = articleList.parents('div');

// console.log(h1, kids, parents);


/*
For this quiz, use a jQuery class selector and featuredArticle variable to toggle the 'featured' class!
*/

// don't change this variable!
// var featuredArticle;

// featuredArticle = $(".featured").toggleClass();

/*
For this quiz, remove the class 'featured' from Article #2 and add it to Article #3!

You must use jQuery's toggleClass method!
*/

// don't change these variable!
var article2, article3;

// target and turn off featured from article 2
article2 = $('.featured');
article2.toggleClass('featured');

// target and toggle the class 'featured'
// for article 3
article3 = article2.next();
article3.toggleClass('featured');
article3.css('padding', '12px'); // don't do this

/*
For this quiz, set the href of the <a> in the first nav item to "#1".

You must use jQuery's attr() method!
*/

// Start with this variable!
var navList;

navList = $('.nav-list');
navListFirst = navList.children().first();
link = navListFirst.find('a');
navListFirst.attr('href', '#1');


/*
For this quiz, change the font-size of all the article-items to 20px!

You must use jQuery's css() method!
*/

// Start with this variable!
var articleItems;

articleItems = $('.article-item');
articleItems.css('font-size', '20px');


/*
For this quiz, use jQuery's val method to make live changes to the 'Cool Articles' <h1>!

The starter code below creates an event listener that will run any time the input changes.
For more on events, check the instructor notes.
*/


$('#input').on('change', function() {
    var val = $('#input').val(),
        heading = $('.articles').children('h1');

    heading.text(val);
});


/*
For this quiz, remove the <ul> from the first article item!

You must use jQuery's remove() method.
*/

// Start with this variable!
var articleItems;

articleItems = $('.article-list li ul');

articleItems.remove();

