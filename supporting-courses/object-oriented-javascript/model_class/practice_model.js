// This is a practical example

// this is the superclass
var Template = function() {
    this.x = 100;
    this.y = 100;
    this.sprite = 'blank';
};

// Car subclass
var Car = function () {
    Template.call();
    this.x = 300;
    this.y = 200;
    this.sprite = sprite + ' and a red car';
};

Car.prototype = Object.create(Template.prototype);
Car.prototype.constructor = Template;

// Player subclass
var Player = function () {
    Template.call();
    this.x = x + 900;
    this.y = 500;
    this.sprite = 'A blue frog';
};

Player.prototype = Object.create(Template.prototype);
Player.prototype.constructor = Template;

// Instantiate the objects
// the template
var theTemplate = new Template(),
    aCar = new Car(),
    aPlayer = new Player()


console.log(theTemplate);
console.log(aCar);
console.log(aPlayer);

// display the objects on an html page
$(function() {
    $('.template .properties .x').append(theTemplate.x);
    $('.template .properties .y').append(theTemplate.y);
    $('.template .properties .sp').append(theTemplate.sprite);

    $('.car .properties .x').append(aCar.x);
    $('.car .properties .y').append(aCar.y);
    $('.car .properties .sp').append(aCar.sprite);

    $('.player .properties .x').append(aPlayer.x);
    $('.player .properties .y').append(aPlayer.y);
    $('.player .properties .sp').append(aPlayer.sprite);
});

