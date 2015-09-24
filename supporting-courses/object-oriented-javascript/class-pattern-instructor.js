'use strict';

// a functional class in js
var Car = function (loc) {
    // constructor
    var obj = { loc: loc };
    obj.move = move;
    return obj;
};

var move = function () {
    this.loc += 1;

};



var amy = new Car(1),
    ben = new Car(9);

amy.move(); // 2
ben.move(); // 10
