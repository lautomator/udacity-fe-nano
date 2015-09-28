// prototypal class

'use strict';

var Car = function (loc) {
    var obj = Object.create(Car.prototype);
    obj.loc = loc;
    return obj;
};

// constructor method
Car.prototype.move = function () {
    this.loc += 1;
};

var amy = Car(1);
amy.move(); // 2

var ben = Car(9);
ben.move(); // 10

console.log(Car.prototype.constructor); // [Function]