// assume libray.js has been imported
// js has no import or include functions

// library.js
var myGame = {

    // this is a decorator because
    // it takes in an object and augments
    // that object with a new property
    objectlike: function (obj, loc) {
        'use strict';
        // constructor
        obj.loc = loc;
        obj.move = function () {
            this.loc += 1;
        };
        return obj;
    }
};


// run.js
var amy = myGame.objectlike({}, 1);
amy.move(); // loc: 2

var ben = myGame.objectlike({}, 9);
ben.move(); // loc: 10