// This is the same as the other file in this
// dir; it only has fewer comments.

// this is the superclass
var Template = function() {
    /** position on the game board */
    var x = 1,
        y = 2,
        sprite = 'blank';
};

// Car subclass
var Car = function () {
    Template.call();
    this.x = 100;
    this.y = 200;
    this.sprite = sprite;
};

Car.prototype = Object.create(Template.prototype);
Car.prototype.constructor = Template;

// // Player subclass
var Player = function () {
    Template.call(this);
    this.x = x + 900;
    this.y = 500;
    this.sprite = 'A blue frog';
};

Player.prototype = Object.create(Template.prototype);
Player.prototype.constructor = Template;

// a new car object
// var aCar = new Car();
// console.log(aCar);

// a new player object
var aPlayer = new Player();
console.log(aPlayer);