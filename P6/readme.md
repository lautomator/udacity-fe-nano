#P6: Feed Reader Testing

##Project Summary
This site loads several [Udacity](https://www.udacity.com/) RSS feeds. There is a menu on the left that allows the user to choose the desired feed. [Jasmine](http://jasmine.github.io/) has been used as the testing platform. The tests conducted were:

* RSS feeds: are they defined? Are their properties defined?
* The Menu: is the menu hidden by default? Does its visibility change when clicked.
* Initial Entries: when a feed loads, is there at least one entry?
* New Feed Selection: does the content actually change when a new feed is loaded?

###Additional tests
In addition, there are two tests that will fail until implemented in `app.js`. They are:

* Limit content to 5 entries or less
* Initial loaded feed should be HTML5 Rocks

##Setup
To get this running:

* Clone or download this repository.
* Open `index.html` in your browser.

*alternately*

* Open your terminal and `cd` to the root directory.
* Run a local server: `python -m SimpleHTTPServer 9000`
* Open your browser and go to [localhost:9000](http://localhost:9000)

You will need [python](https://www.python.org/) for the SimpleHTTPServer module. If you do not have Python, follow the directions on Python site to install it.

Once the web page is open, the test results will appear at the bottom of the page.

##Testing
You can add more tests in: `jasmine/spec/feedreader.js`. Implement new code in `app.js` and/or `index.html`, accordingly.
