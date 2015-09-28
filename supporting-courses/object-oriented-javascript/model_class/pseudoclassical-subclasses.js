// super and subclasses in the pesuedoclassical pattern
// This is the common practice now, as Object.create() was added
// to the language

// this is the superclass
var Car = function (loc) {
    // properties
    this.loc = loc;
};

// use the prototype chanin to save memory
// add the move function to the Object.prototype
Car.prototype.move = function () {
    this.loc += 1;
};

// the van subclass
var Van = function (loc) {
    Car.call(this, loc);
};

// Van will inherit from the Car prototype
Van.prototype = Object.create(Car.prototype);

// New instances of Van will refer to Van,
// which then move up the chanin to Car.prototype
Van.prototype.constructor = Van;

// Van's methods will refer to Van.prototype,
// which then moves up the chain to Car.prototype
// upon any failed look ups.
Van.prototype.grab = function () {
    console.log('Van grabbed');
};

// this instantiates the super class
var zed = new Car(3);
zed.move(); // 4

// this instantiates the sub class
var amy = new Van(9);
amy.move(); // 10
amy.grab(); // LOG: 'Van grabbed'