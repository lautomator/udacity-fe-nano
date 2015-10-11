// ========
//  Global
// ========

// The following are helper functions and objects
// that exist in the global scope. They are enclosed
// in a wrapper object for organization.
var frogger = {
    // This method generates a random selection
    // from the given array ('choices').
    randomSelector: function(choices) {
        var ran = Math.floor(Math.random() * choices.length);
        return choices[ran];
    },
    cars: ['red', 'yellow', 'blue'],
    enemyPositionsY: [35, 120, 205],
    enemyPositionsX: [-100, 0, 100, 200, 300, 400],
    enemySpeeds: [100, 200, 300, 400, 500, 600],
    resetGame: function(scr, reset) {
        // This will reset the score of the game
        // and remove any rewards (gems)
        var displayScore = scr.innerHTML;

        reset.addEventListener('click', function() {
            // reset the score and refresh the display
            player.score = 0;
            displayScore = player.score;

            // reset the player position
            player.x = 200;
            player.y = 375;

            // reset the enemies
            // The enemies will move to the position
            // where they will reset speed and position
            for (enemy in allEnemies) {
                allEnemies[enemy].x = 565;
            }
        }, false);
    },
     getInstructions: function(btn, inst, close) {
        // toggle the instructions
        btn.addEventListener('click', function() {
            inst.style.display = 'block';
        }, false);

        // close the window
        close.addEventListener('click', function() {
            inst.style.display = 'none';
        }, false);
    }
}; // globals


// =========
//  Enemies
// =========

// Enemies our player must avoid (cars)
var Enemy = function() {
    // Car colors are picked at random from the list below.
    var car = frogger.randomSelector(frogger.cars);

    this.sprite = 'images/enemy-car-' + car + '.png';

    // define initial positions and speeds, selected randomly
    var yPos = frogger.randomSelector(frogger.enemyPositionsY),
        xPos = frogger.randomSelector(frogger.enemyPositionsX),
        spd = frogger.randomSelector(frogger.enemySpeeds);

    this.x = xPos;
    this.y = yPos;
    this.speed = spd;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // method to change the speed
    var newSpeed = function() {
            var spd = frogger.randomSelector(frogger.enemySpeeds);
            return spd;
    },
    // method to change position
        newPos = function() {
            var pos = frogger.randomSelector(frogger.enemyPositionsY);
            return pos;
    },
    // method to change color
        newCar = function() {
            var car = frogger.randomSelector(frogger.cars),
                sprite = 'images/enemy-car-' + car + '.png';
            return sprite;
    };

    // The enemies will change position, speed, and color
    // when they reach the end of the game board (pos 565).
    if (this.x > 565) {
        this.x = frogger.enemyPositionsX[0];
        this.speed = newSpeed();
        this.y = newPos();
        this.sprite = newCar();
    } else {
        // set the speed
        this.x += this.speed * dt;
    }

    // check for a collision
    var coords = {
        enemy: [Math.floor(this.x), Math.floor(this.y)],
        player: [player.x, player.y]
    };

    // check the coords (first y, then x)
    if (coords.enemy[1] === coords.player[1]) {
        if ((coords.enemy[0] + 50) === coords.player[0]
            || coords.enemy[0] === coords.player[0]
            || (coords.enemy[0] - 50) === coords.player[0]) {
            // console.log('collision');
            // player goes back to the beginning
            player.x = 200;
            player.y = 375;
        }
    }
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

    this.sprite = 'images/player-frog-blue.png';

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

    // display/update the score
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
                if (this.score > 100) {
                    this.score = 0;
                }
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
        // console.log('keystroke:', this.x, this.y);
    }
};

// This method displays a player's score
Player.prototype.displayScore = function(scr) {
    var scoreTarget = gameTargets.score,
        rewards = gameTargets.rewards;

    // update the current score
    scoreTarget.innerHTML = scr;
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
