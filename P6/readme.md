#P6: Feed Reader Testing

##Project Summary
This site loads several Udacity RSS feeds. There is a menu on the left that allows the user to choose the desired feed. [Jasmine](http://jasmine.github.io/) has been used to run tests on site. The tests conducted are:

* RSS feeds: are they defined? Are their properties defined?
* The Menu: is the menu hidden by default? Does its visibility change when clicked.
* Initial Entries: when a feed loads, is there at least one entry?
* New Feed Selection: does the content actually change when a new feed is loaded?

## Setup
To get this running:

* Clone or download this repository.
* Open `index.html` in your browser.
*alternately*
* Open your terminal and `cd` to the root directory.
* Run a local server: `python -m SimpleHTTPServer 9000`
* Open your browser and go to [localhost:9000](http://localhost:9000)

You will need [python](https://www.python.org/) for the SimpleHTTPServer module. If you do not have Python, follow the directions on Python site to install it.

Once the web page is open, the test results will appear at the bottom of the page.