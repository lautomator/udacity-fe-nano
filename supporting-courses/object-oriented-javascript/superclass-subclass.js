// super classes and subclasses


// the super class
var Car = function (loc) {
    // constructor
    var obj = { loc: loc };

    // methods
    obj.move = function () {
        console.log(obj.loc += 1);
    };

    return obj;
};

// subclasses
var Van = function (loc) {
    // constructor
    var obj = Car(loc);

    // methods
    obj.grab = function () {
        console.log('Van grabbed');
    };

    return obj;
};

var Cop = function (loc) {
    // constructor
    var obj = Car(loc);

    // methods
    obj.call = function () {
        console.log('Cop has been called');
    };

    return obj;
};

// create objects and call functions
var amy = new Car(1),
    ben = new Car(9),
    cal = new Cop(2),
    bud = new Van(5);

amy.move(); // 2
ben.move(); // 10

cal.move(); // 3
cal.call(); // Cop has been called

bud.move(); // 6
bud.grab(); // Van grabbed

