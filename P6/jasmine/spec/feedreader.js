/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    // These are in this testing scope so that they
    // are accessible below.
    var index = 0,
        len = allFeeds.length;

    // returns two unique random feed ids
    // with max number passed in
    function getRanId(max) {
        var ids = [];
        index = 0;

        // ensure a max of at least 2
        if (max < 1) {
            max = 2;
        }

        // set the ids
        ids[0] = Math.floor((Math.random() * (max)));
        ids[1] = Math.floor((Math.random() * (max)));

        // fix a duplicate id
        while (index < 50) {
            if (ids[1] === ids[0]) {
                ids[1] = Math.floor((Math.random() * (max)));
            } else {
                break;
            }
            index += 1;
        }
        return ids;
    }

    // set the timeout to be longer than the default
    // in the case that more time is needed
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    /***************/
    /* TESTS BEGIN */
    /***************/

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        // tests
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Loops through the allFeeds object and ensures that every
        // item has a 'url' defined and is not empty
        it('ensures all url fields are defined', function() {
            index = 0;
            while (index < len) {
                expect(allFeeds[index].url).toBeDefined();
                expect(allFeeds[index].url).not.toBe('');
                index += 1;
            }
        });

        // Loops through the allFeeds object and ensures that every
        // item has a 'name' defined and is not empty
        it('ensures all name fields are defined', function() {
            index = 0; // resets the index
            while (index < len) {
                expect(allFeeds[index].name).toBeDefined();
                expect(allFeeds[index].name).not.toBe('');
                index += 1;
            }
        });
    });

    describe('The menu', function() {
        /* Menu Tests - it tests the following:
         * -> tests to ensure the menu element is hidden
         * by default
         * -> tests to ensure that the menu changes visibility
         * when the menu icon is clicked.
         */

        it('ensures menu element is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('ensures menu changes visibility when clicked', function() {
            // the menu should change visibility when the menu icon is clicked
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // the menu should change visibility when menu icon is clicked again
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    describe('Initial Entries', function() {
        /* -> ensures that when the loadFeed function is called and
         * completes its work, there is at least a single '.entry'
         * element within the '.feed' container.
         */

        // get a random number between 0 and the
        // length of the feeds array
        var ranIds = getRanId(len),
            feedId = ranIds[0]; // the index of the API feed array

        // test the exception only after loadFeed is done
        beforeEach(function(done) {
            // load the randomly selected feed
            loadFeed(feedId, function() {
                done();
            });
        });

        // check for one '.entry' element after loadFeed is done
        it('should be at least one .entry element', function(done) {
            expect($('.feed a article').hasClass('entry')).toBe(true);
            done();
        });
    });

    describe('New Feed Selection', function() {
        /* -> ensures when a new feed is loaded
         * by the loadFeed function that the content
         * actually changes. To do this, we will load
         * one feed, store its content and then load
         * feed and store its content; we will then
         * compare the content to ensure that they
         * are not the same.
         */

        // get two random feeds to test
        var ids = getRanId(len),
            oldFeedId = ids[0],
            newFeedId = ids[1],
            oldEntry,
            newEntry;

        // test the exception only after loadFeed is done
        beforeEach(function(done) {
            // clear the existing feed
            $('.feed').html('');

            // load a feed
            loadFeed(oldFeedId, function() {
                // get the entry name (gets the first entry)
                oldEntry = $('.entry:first').text();
                done();
            });
        });

        beforeEach(function(done) {
            // clear the existing feed
            $('.feed').html('');

            // load another feed
            loadFeed(newFeedId, function() {
                // get the entry name (gets the first entry)
                newEntry = $('.entry:first').text();
                done();
            });
        });

        // check that newEntry != oldEntry
        it('content actually changes', function(done) {
            expect(newEntry).not.toEqual(oldEntry);
            done();
        });
    });

    /*****************************************************
    /* additional tests that will fail until implemented *
     *****************************************************/

    describe('Limit content to 5 entries or less', function() {
        /* -> ensures when a new feed is loaded
         * that only the first 5 entries (or less)
         * will appear on the screen.
         */


        var limit = 5, // the max length
            ranIds = getRanId(len), // get one feed chosen at random
            feedId = ranIds[0]; // the index of the API feed array

        // load the API async
        beforeEach(function(done) {
            loadFeed(feedId, function() {
                done();
            });
        });

        // check the length of the feed
        it('the page displays 5 or less items', function(done) {
            expect($('.entry').length).not.toBeGreaterThan(limit);
            done();
        });
    });

    describe('Initial loaded feed should be HTML5 Rocks', function() {
        /* -> ensures when the API is loaded
         * 'HTML5 Rocks' is the first feed to load
         */

        var feedId = 0; // the first feed

        // load the API async
        beforeEach(function(done) {
            loadFeed(feedId, function() {
                done();
            });
        });

        // check name of the feed
        it('the initial feed to load is HTML5 Rocks', function(done) {
            expect($('.header-title').text()).toBe('HTML5 Rocks');
            done();
        });
    });
}());