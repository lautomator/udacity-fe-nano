// This is the same as the other file in this
// dir; it only has fewer comments.

// this is the superclass
var Car = function (loc) {
    // properties
    this.loc = loc;
};

// Car methods
Car.prototype.move = function () {
    this.loc += 1;
};

// the van subclass
var Van = function (loc) {
    Car.call(this, loc);
};

Van.prototype = Object.create(Car.prototype);
Van.prototype.constructor = Van;

// Van methods
Van.prototype.grab = function () {
    console.log('Van grabbed');
};

var zed = new Car(3);
zed.move(); // 4

var amy = new Van(9);
amy.move(); // 10
amy.grab(); // LOG: 'Van grabbed'