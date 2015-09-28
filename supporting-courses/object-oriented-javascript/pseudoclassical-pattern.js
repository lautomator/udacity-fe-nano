// pseudoclassical pattern
// constructor
var Car = function (loc) {
    this.loc = loc;
};

// constructor method
Car.prototype.move = function () {
    this.loc += 1;
};

var amy = new Car(1);
amy.move(); // 2

var ben = new Car(9);
ben.move(); // 10
