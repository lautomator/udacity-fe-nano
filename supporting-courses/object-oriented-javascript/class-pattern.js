'use strict';

// a functional class in js
var Car = function (loc) {
    // constructor
        var obj = {
            loc: loc
        };
        return obj;
    },
    move = function (obj) {
        obj.loc += 1;
    };



var amy = new Car(1),
    ben = new Car(9);

move(amy); // 2
move(ben); // 10
