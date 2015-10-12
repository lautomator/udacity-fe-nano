/********
  Global
 ********/

/**
* @description Global functions
* @summary global helper functions and objects
* @global
* @namespace
*/
var frogger = {
    /**
    * @function randomSelector
    * @summary generates a random selection
    * @memberof frogger
    * @param {array} choices
    * @returns {array object} a random choice
    * @inner
    */
    randomSelector: function(choices) {
        var ran = Math.floor(Math.random() * choices.length);
        return choices[ran];
    },
    cars: ['red', 'yellow', 'blue'],
    enemyPositionsY: [35, 120, 205],
    enemyPositionsX: [-100, 0, 100, 200, 300, 400],
    enemySpeeds: [100, 200, 300, 400, 500, 600],
    players: {
        petrified       : 'blue',
        less_petrified  : 'cyan',
        scared          : 'magenta',
        less_scared     : 'orange',
        mellow          : 'yellow',
        im_the_master   : 'green'
    },
    /**
    * @function playerReset
    * @summary resets the player's position
    * @memberof frogger
    * @param {Object} player
    * @inner
    */
    playerReset: function(player) {
        /** initial player position */
        player.x = 200;
        player.y = 375;
    },
    /**
    * @function playerChange
    * @summary changes the player's color
    * @description every 10 points earned (up to 50)
      will change the color of the frog
    * @memberof frogger
    * @param {Object} player
    * @param {number} score
    * @inner
    */
    playerChange: function(player, score) {
        /** default color */
        var color = frogger.players.petrified;

        if (score >= 10 && score < 20) {
            color = frogger.players.less_petrified;
        }
        if (score >= 20 && score < 30) {
            color = frogger.players.scared;
        }
        if (score >= 30 && score < 40) {
            color = frogger.players.less_scared;
        }
        if (score >= 40 && score < 50) {
            color = frogger.players.mellow;
        }
        if (score >= 50) {
            color = frogger.players.im_the_master;
        }

        player.sprite = 'images/player-frog-' + color + '.png';
    },
    /**
    * @function isCollision
    * @summary determines if the player has collided with an enemy
    * @memberof frogger
    * @param {number} enemy
    * @returns {boolean}
    * @inner
    */
    isCollision: function(enemy) {
        var coords = {
                enemy: {
                    x: enemy.x,
                    y: enemy.y
                },
                player: {
                    x: player.x,
                    y: player.y
                }
            },
            collision = false;

        // check the coords (first y, then x)
        if (coords.enemy.y === coords.player.y) {
            if ((coords.enemy.x + 33) >= (coords.player.x - 33) &&
                (coords.enemy.x - 33) <= coords.player.x + 33) {

                collision = true;
            }
        }
        return collision;
    },
    /**
    * @function resetGame
    * @summary resets the game
    * @memberof frogger
    * @param {number} scr
    * @param {number} reset
    * @returns {boolean}
    * @inner
    */
    resetGame: function(scr, reset) {
        /** This will display the score of the game */
        var displayScore = scr.innerHTML;

        reset.addEventListener('click', function() {
            /** reset the score and refresh the display */
            player.score = 0;
            displayScore = player.score;

            var enemy = 0;

            /** reset the player position */
            /** @function */
            frogger.playerReset(player);

            /** reset the enemies:
            The enemies will move to the position
            where they will reset speed and position */
            while (enemy  < allEnemies.length) {
                if (allEnemies.hasOwnProperty(enemy)) {
                    allEnemies[enemy].x = 565;
                    enemy += 1;
                }
            }
        }, false);
    },
    /**
    * @function getInstructions
    * @summary toggles the instruction panel
    * @memberof frogger
    * @returns {boolean}
    * @inner
    */
     getInstructions: function(btn, inst, close) {
        /** toggle the instructions */
        btn.addEventListener('click', function() {
            inst.style.display = 'block';
        }, false);

        /** close the window */
        close.addEventListener('click', function() {
            inst.style.display = 'none';
        }, false);
    }
};


/**********************
  Abstract Game Object
 **********************/

/**
* Creates an abstract class
* @description all game objects share
* two things: position and rendering
* @class
* @constructor
*/

/*********
  Enemies
 *********/

/**
* Creates a new Enemy
* @class
* @constructor
*/
var Enemy = function() {
    /** @function */
    var car = frogger.randomSelector(frogger.cars);

    this.sprite = 'images/enemy-car-' + car + '.png';

    /** @function */
    var yPos = frogger.randomSelector(frogger.enemyPositionsY),
        xPos = frogger.randomSelector(frogger.enemyPositionsX),
        spd = frogger.randomSelector(frogger.enemySpeeds);

    this.x = xPos;
    this.y = yPos;
    this.speed = spd;
};

/**
* @function update
* @summary update the enemy's position
* @param {time object} dt
*/
Enemy.prototype.update = function(dt) {
    /**
    * @function newSpeed
    * @summary set new Enemy speed
    * @returns {number}
    */
    var newSpeed = function() {
            /** @function */
            var spd = frogger.randomSelector(frogger.enemySpeeds);
            return spd;
    },
    /**
    * @function newPos
    * @summary set new Enemy position
    * @returns {number}
    */
        newPos = function() {
            /** @function */
            var pos = frogger.randomSelector(frogger.enemyPositionsY);
            return pos;
    },
    /**
    * @function newCar
    * @summary set new Enemy color
    * @returns {string}
    */
        newCar = function() {
            /** @function */
            var car = frogger.randomSelector(frogger.cars),
                sprite = 'images/enemy-car-' + car + '.png';
            return sprite;
    };

    /** The enemies will change position, speed, and color
    when they reach the end of the game board (pos 565). */
    if (this.x > 565) {
        this.x = frogger.enemyPositionsX[0];
        this.speed = newSpeed();
        this.y = newPos();
        this.sprite = newCar();
    } else {
        /** set the speed */
        this.x += this.speed * dt;
    }

    /** check for a collision */
    if (frogger.isCollision(this)) {
        /** player goes back to the beginning */
        /** @function */
        frogger.playerReset(player);
    }
};

/**
* @function render
* @summary draw the enemy on the screen
*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/********
  Player
 ********/

/**
* Creates a new Player
* @class
* @constructor
*/
var Player = function() {
    this.sprite = 'images/player-frog-blue.png';

    /** initial player position */
    /** @function */
    frogger.playerReset(this);
    /** initial player score */
    this.score = 0;
};

/**
* @function update
* @summary updates the position of the player
* @description This updates the position of the player
  based on movement, controlled through the
  keystrokes. The direction (dir) of movement is
  the object that is passed into the function.
* @param {number} dir
*/
Player.prototype.update = function(dir) {
    /** update the position */
    if (dir) {
        this.x += dir.x;
        this.y += dir.y;
    }

    /** display/update the score */
    /** @function */
    this.displayScore(player.score);

    /** set a new color, if earned */
    /** @function */
    // console.log(player.score);
    frogger.playerChange(player, player.score);
    // this.sprite = 'images/player-frog-blue.png';
};

/**
* @function render
* @summary draw the player on the screen
*/
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* @function handleInput
* @summary handles the keystrokes
* @description Takes in the keystroke from 'allowed keys'
  and stores an increment of movement (for x an y, resp.)
  inside an object (move). The move object is passed into
  update() to update the player's position in the canvas.
  Contains the position of the player within the boundary.
* @param {string} direction
*/
Player.prototype.handleInput = function(direction) {
    var move = {
        x: 0,
        y: 0
    };

    if (direction) {
        /** These conditions increment the players position
        and keep the player within the game boundary. */

        /** this first condition also indicates a successful pass */
        if (direction === 'up') {
            if (this.y === 35) {
                /** back to the original position */
                /** @function */
                frogger.playerReset(this);
                /** update the score */
                this.score += 1;
            } else {
                move.y = -85;
            }
        }
        if (direction === 'down' && (this.y !== 375)) {
            move.y = 85;
        }
        if (direction === 'left' && (this.x !== 0)) {
            move.x = -100;
        }
        if (direction === 'right' && (this.x !== 400)) {
            move.x = 100;
        }
        /** @function */
        player.update(move);
    }
};

/**
* @function displayScore
* @summary displays a player's score
* @param {number} scr
*/
Player.prototype.displayScore = function(scr) {
    var scoreTarget = gameTargets.score;
    /** update the current score */
    scoreTarget.innerHTML = scr;
};


/**************
  Game Objects
 **************/

/** @type {Object} */
var moe = new Enemy(),
    larry = new Enemy(),
    curly = new Enemy(),
    player = new Player(),
    allEnemies = [moe, larry, curly];

/********
  Events
 ********/

/** @listens function:handleInput */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        '37': 'left',
        '38': 'up',
        '39': 'right',
        '40': 'down'
    };

    /** @function */
    player.handleInput(allowedKeys[e.keyCode]);
});
