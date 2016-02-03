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

        // These are in the global scope so that they
        // are accessible below.
        var index = 0,
            len = allFeeds.length;

        // tests
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Loops through the allFeeds object and ensures that every
        // item has a 'url' defined and is not empty
        it('ensures all url fields are defined', function() {
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

        // the index of the API feed array
        var id = 0;

        // test the exception only after loadFeed is done
        beforeEach(function(done) {
            loadFeed(id, function() {
                done();
            });
        });

        // check for one '.entry' element after loadFeed is done
        it('should be at least one .entry element', function(done) {
            expect($('.feed a article').hasClass('entry')).toBe(true);
            done();
        });
    });



    /* TODO: Write a new test suite named "New Feed Selection"

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
}());
