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

    // define a position from 3 choices, selected randomly
    var yPositions = [35, 120, 205],
        yRanPos = Math.floor(Math.random() * yPositions.length),
        yPos = yPositions[yRanPos],
        // x positions
        xPositions = [-100, 0, 100, 200, 300, 400],
        xRanPos = Math.floor(Math.random() * xPositions.length),
        xPos = xPositions[xRanPos],
        // generate speed
        speeds = [100, 200, 300, 400, 500, 600],
        ranSpd =  Math.floor(Math.random() * speeds.length),
        spd = speeds[ranSpd];

    this.x = xPos;
    this.y = yPos;
    this.speed = spd;
    this.collision = false; // assume no collision has been made
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // The enemies will change position and speed
    // when they reach the end of the game board.



    // if the Enemy reaches the far right,
    // reset to the left again and change the speed
    if (this.x > 565) {
        this.x = -100;
    } else {
        // set the speed
        this.x += this.speed * dt;
    }

    // determine if the enemy has colided with the player
    // define a collision
    // var collision = {[this.y, this.x + 70], [player.x, player.y]};
    // if (Math.floor(this.x + 70, this.y) === player.x && this.y === 226) {
    //     player.x = 200;
    //     player.y = 375;
    // }
    // console.log(Math.floor(this.x));
    // console.log(player.x);

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
    // initial player score
    this.score = 0;
};

// This updates the position of the player
// based on movement, controlled through the
// keystrokes. The direction (dir) of movement is
// the object that is passed into the function.
Player.prototype.update = function(dir) {
    // update the position
    if (dir) {
        this.x += dir.x;
        this.y += dir.y;
    }

    // display the score
    this.displayScore(player.score);
}

// Render the player on the canvas and position
// it according to the current (or default) x and y coords
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Takes in the keystroke from 'allowed keys' and stores
// an increment of movement (for x an y, resp.) inside
// an object (move). The move object is passed into update()
// to update the player's position in the canvas.
// Contains the position of the player within the boundary.
Player.prototype.handleInput = function(direction) {
    var move = {x: 0, y: 0};

    if (direction) {
        // These conditions increment the players position
        // and keep the player within the game boundary.

        // this first condition also indicates a successful pass
        if (direction === 'up') {
            if (this.y === 35) {
                // back to the original position
                this.x = 200;
                this.y = 375;
                // update the score
                this.score += 1;
            } else {
                move.y = -85;
            }
        }
        if (direction === 'down' && !(this.y === 375)) {
            move.y = 85;
        }

        if (direction === 'left' && !(this.x === 0)) {
            move.x = -100;
        }

        if (direction === 'right' && !(this.x === 400)) {
            move.x = 100;
        }

        player.update(move);
        console.log('keystroke:', this.x, this.y);

    }
};

// TODO: this will also handle gems: a system of rewards
// This method displays a player's score.
Player.prototype.displayScore = function(scr) {
    var scoreTarget = gameTargets.score;
    scoreTarget.innerHTML = scr;
};

// TODO: This may need to be part of the game engine
var resetGame = function() {
    // This will reset the score of the game

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


