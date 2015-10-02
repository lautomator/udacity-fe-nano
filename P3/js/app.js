// =========
//  Enemies
// =========

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // the initial location of an enemy on the gameboard
    // pos__1
    this.x = -100;
    this.y = 60;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

// TODO: FIX THIS >>>>>>>>>>>>
    // while (this.x < 600) {
    //     this.x += (300 * dt);
    //     console.log(this.x);
    // }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// ========
//  Player
// ========

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // TODO: add functionality whereby player
    // can pick from the available sprites
    this.sprite = 'images/char-boy.png';

    // initial player position
    this.x = 200;
    this.y = 375;
};

// This updates the position of the player
// based on movement, controlled through the
// keystrokes. The direction (dir) of movement is
// the object that is passed into the function.
Player.prototype.update = function(dir) {
    if (dir) {
        this.x += dir.x;
        this.y += dir.y;
        // console.log(this.x, this.y);
    }
}

// Render the player on the canvas and position
// it according to the current (or default) x and y coords
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// takes in the keystroke from 'allowed keys' and stores
// an increment of movement (for x an y, resp.) inside
// an object (move). The move object is passed into update()
// to update the player's position in the canvas
Player.prototype.handleInput = function(direction) {
    var move = {x: 0, y: 0};

    if (direction) {
        if (direction === 'up') {
            move.y = -85;
        }

        if (direction === 'down') {
            move.y = 85;
        }

        if (direction === 'left') {
            move.x = -100;
        }

        if (direction === 'right') {
            move.x = 100;
        }

        player.update(move);
        console.log(this.x, this.y);
    }
};

// ==============
//  Game Objects
// ==============

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var moe = new Enemy(),
    larry = new Enemy(),
    curly = new Enemy(),
    allEnemies = [moe, larry, curly],
    player = new Player();

// ========
//  Events
// ========

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
