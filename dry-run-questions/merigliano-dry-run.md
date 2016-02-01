# Front-End Interview Dry Run

##Question 1 - What is the most influential book or blog post you’ve read regarding front-end development?

A book that has been influential to me as a front-end developer is *JavaScript: The Good Parts* by Douglas Crockford. I find it to be influential because Crockford explains the history of how JavaScript was developed and why it is easy to write poor JavaScript code. This book helped me to tighten up my JavaScript code writing and develop better habits by writing cleaner code. The section on Objected Oriented JS was particulary helpful in to me in terms of understanding how to use the prototype object as it pertains to JavaScript. After reading this book, I was able to develop a simple game called (CodeBreaker)[https://github.com/lautomator/codebreaker] and was able to utilize some of Crockford's concepts. This is a small book but it is surprisingly dense. I still refer to it so that I can better understand this language.

##Question 2 - If you could master one technology this year, what would it be and why?
Although I have proficiency with Backbone.js, I would like to master this technology by diving into it even deeper. Something that would help me do this would be to create several more projects using Backbone. This is a relevant framework and I feel that mastering it would enable me to be more productive by creating solid, scalable, foundations for web apps.

##Question 3 - Describe any front-end web application framework (preferably one that you use). How does it work? What are the upsides and downsides?
One framework that I use is (Django)[https://docs.djangoproject.com/en/1.9/]. It works like a lot of other frameworks in that it is based on a Model/View/Controller design pattern. Django apps are written in Python. The framework allows me to keep all of my front-end and back-end logic separate. I can then scale the app and update it much easier than if it did not have this organization. In general, the way that Django works, is that you create your Model that will contain any of the dynamic data for your site. This data is saved to a database. The Views can have all of your Controller logic and render logic. From the View, you can use a templating system to render the data from your model. Additionally, you can set up your URL routing as a separate layer as well. this gives you controll of how urls are handled and what kind of queries they can pass onto a generated page.

One of the downsides of Django is that it is dense: There is a lot that it can do and there are many things that you can add to it to make your life easier. These are called *mixins*; This could be interpreted as a positive thing, however, my point is that it takes a lot of time to get comfortable with Django and to get an app up and running. Deploying the app can also be quite arduous, depending on how the back-end for the server needs to be set up.

On the other hand, Django allows you to create apps that can be scaled to meet the needs to the app. Here is a sample of a project that I created with Django: (Collections)[https://github.com/lautomator/collections].

##Question 4 - Write a function that takes only one argument——another function——and returns a "memoized" version of that function. A "memoized" version of a function caches and returns the results of its call so that when it is called again with the same input, it doesn’t run its computation but instead returns the results from cache. Note that previous results should be retrievable in any order without re-computation.

```
repeatIt = function(s) {
    // takes a string
    // returns the string repeated <string> <string>
    if (typeof s !== 'string') {
        // check for the proper type
        return 'Please enter a string only.';
    } else {
        return s + ' ' + s;
    }
}

function memoize(func) {
    // cache to store previous calls
    var cache = {};

    return function() {
        // the key is each returned result
        var key = JSON.stringify(arguments);

        if(cache[key]) {
            // if the key exists, return it
            console.log('this already exists');

            return cache[key];
        } else {
            // this is a new entry; store it in
            // the cache and return it
            console.log('this is a new entry');

            var val = func.apply(this, arguments);
            cache[key] = val;

            return val;
        }
    };
}

var repeated = memoize(function(s) {
    // takes an argument
    console.log('working...');

    return repeatIt(s);
});

// Example #1
// IN
console.log(repeated('hello'));
// OUT
working...
this is a new entry
hello hello

// Example #2
// IN
console.log(repeated('goodbye'));

// OUT
working...
this is a new entry
goodbye goodbye

// Example #3
// IN
console.log(repeated('hello'));
this already exists
hello hello
```

##Question 5 - Create a simple webpage that has a cow image in the middle (centered horizontally on the page) and a counter label below it. Add the necessary code so that every time you click the cow image, the counter is incremented by 1. The counter should start with a value of 0.

This is the code for my cow clicker App:
A container `<div>` is set to contain the image of the cow and the counter. As the user clicks the image of the cow, the javascript function is invoked to add clicks. The app itself is wrapped in a var called cowClicker. A `clicks` var is used to keep track of the clicks. `addClick` increments the `clicks` var by 1. `init` uses jQuery to listen for clicks and invoke the function to increment the clicks. Finally, the app itself is invoked: `cowClicker.init()`.

```
<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="favicon.png" type='image/x-icon'>

        <title>Cow Clicker</title>

        <style>
            .container {
                font-family: sans-serif;
                margin: 50px auto;
                max-width: 600px;
            }
            .cow {
                cursor: pointer;
                width: 100%;
            }

            .counter {
                text-align: center;
                width: 100%;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- the cow image -->
            <div class="cow">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Cow_cartoon_04.svg" alt="moooooooo">

                <!-- the counter -->
                <h2 class="counter">0</h2>
            </div>
        </div>

        <!-- get jquery -->
        <script src="https://code.jquery.com/jquery-2.2.0.min.js"></script>

        <script>
            var cowClicker = {
                clicks: 0, // default clicks
                addClick: function() {
                    // increments the clicks
                    this.clicks += 1;
                },
                init: function() {
                    // add clicks when the user clicks
                    $('.cow').click(function() {
                        cowClicker.addClick();

                        // render on the screen
                        $('.counter').text(cowClicker.clicks);
                    });
                }
            };
            // run the app
            cowClicker.init();
        </script>
    </body>
</html>
```

##Question 6 - If you were to start your front-end position today, what would be your goals a year from now?
Job description:

**Front-End Web Developer**

Malvern, PA
Full-time $75k - $85k
**Job Details**

We are a well-established, award winning, marketing products company.

**What You Will Be Doing**

Located near King of Prussia, PA, is our long-standing and highly-respected marketing products company. Transitioning in an Agile environment, our team comprised of super-talented Developers are joining forces to create a stronger product in the digital space. While this position is looking for a 2 - 5 year SOLID Front-End Developer, we would prefer this candidate to be exposed to Java, AngularJS, Mobile App Development and if you can provide a Web App portfolio, that would be a major bonus. There's no time to waste! Our loyal customers, who we have been servicing year-after-year, are growing quickly and we need to catch up with the speed of our expanding business. We are looking to hire right away and would like to meet with you immediately! Apply today.

**What You Need for this Position**
- HTML5/CSS3 (2 - 5 years of experience)
- Web Application experience (2 - 5 years of professional experience)
- REST API experience (Requirement)
- Bachelor's in Computer Science or similar (Requirement)
- Mobile App Development (Bonus)
- Java (Bonus)
- Agile Methodologies (Major Bonus - almost a requirement)
- Client-facing personality (Bonus)

**What's In It for You**
Fantastic work environment
Advancement path
Competitive salary range of $75K - $85K
PTO
Benefits
Company lunches
Open-floor work environment
So, if you are a Front-End Web Developer with experience, please apply today!
Applicants must be authorized to work in the U.S.

##
The position described above would be a great opportunity for me because I posses the skills being asked for. If I were to start this position today, my goals for the next year would be to continue to improve my skills with REST APIs, Web Frameworks, and continue to build my Java programming skills. Technologies change and any apps using frameworks mmay need to be refactored in some way a year from now; this would be a critical goal and one that would help to keep my skills fresh with that particular technology.