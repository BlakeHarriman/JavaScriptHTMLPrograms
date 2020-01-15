var COLS = 28, ROWS = 36; //FLAGS variable used for tracker in HTML
var board = [];
var state = [];
var BLANK = -1
var WALL = 0;
var PELLET = 1;
var PACMAN = 2;
var playing = true;
px=26;
py=13;
gs=tc=20;
xv=0; yv=0;

//Maze
var maze = [
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	];

//Checks to make sure tha the coordinates are in bounds

function inBounds(x, y) {
	return x >= 0 && y >= 0 && x < COLS && y < ROWS;
}

//Initializes the board and state to empty and closed state

/*function init() {
	for (var y = 0; y < COLS; y++) {
		board.push([]);
		state.push([]);
		for (var x = 0; x < ROWS; x++) {
			if (inMap(x, y)) {
				board[y].push(0);
				state[y].push(WALL);
			} else if (x == px && y == py) {
				board[y].push(2);
				state[y].push(PACMAN);
			} else if (isBlank(x, y)) {
				board[y].push(-1);
				state[y].push(BLANK);
			} else {
				board[y].push(1);
				state[y].push(PELLET);
			}
		}
	}
	for (var y = 0; y < COLS; y++) {
		for (var x = 0; x < ROWS; x++) {
			console.log("X: " + x);
			console.log("Y: " + y);
			console.log("STATE: " + state[y][x]);
		}
	}
	console.log("EAFASDLFKJASDLFKJASDFLJASDFSDJF");
}*/

var maze = {
	canvas : document.createElement("canvas"),
	start : function() {
		canvas.width = 448;
		canvas.height = 576;
		context = canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
	},
	
	clear: function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
	}
}

function component(width, height, color, x, y, type) {
	this.width = width;
	this.height = height;
	this.color = color;
	this.x = x;
	this.y = y;
	this.type = type;
	this.speed = 1;
	this.angle = 0;
	this.update = function() {
        ctx = canvas.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);        
        ctx.restore();    
    }
	this.newPos = function() {
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }
}


function init() {
	pacman = new component (5, 5, "yellow", 26, 13, "pac");
	blinky = new component (5, 5, "red", 16, 12, "ghost");
	inky = new component (5, 5, "blue", 16, 13, "ghost");
	pinky = new component (5, 5, "pink", 16, 14, "ghost");
	clyde = new component (5, 5, "orange", 16, 15, "ghost");
	
	for (var y = 0; y < COLS; y++) {
		board.push([]);
		state.push([]);
		for (var x = 0; x < ROWS; x++) {
			if (inMap(x, y)) {
				board[y].push(0);
				state[y].push(WALL);
			} else if (x == px && y == py) {
				board[y].push(2);
				state[y].push(PACMAN);
			} else if (isBlank(x, y)) {
				board[y].push(-1);
				state[y].push(BLANK);
			} else {
				board[y].push(1);
				state[y].push(PELLET);
			}
		}
	}
	for (var y = 0; y < COLS; y++) {
		for (var x = 0; x < ROWS; x++) {
			console.log("X: " + x);
			console.log("Y: " + y);
			console.log("STATE: " + state[y][x]);
		}
	}
	console.log("EAFASDLFKJASDLFKJASDFLJASDFSDJF");
}

//Opens the block when it is clicked on

function openBlock(x, y) {
	if (!playing) {
		return;
	}
	
	if (state[y][x] == STATE_FLAGGED) { //If it is flagged then don't open it
		return;
	}
	if (board[y][x] == BLOCK_MINE) { //If it is a mine then game over
		alert('Game Over');
		playing = false;
		revealBoard(false);
		document.getElementById("smiley").style.display = "none";
		document.getElementById("dead").style.display = "block";
		return;
	}
	
	state[y][x] = STATE_OPENED;
	if (board[y][x] == 0) {
		for (var dx = -1; dx <= 1; dx++) {
			for (var dy = -1; dy <= 1; dy++) {
				var xx = x + dx,
					yy = y + dy;
				if (inBounds(xx, yy)) {
					if (state[yy][xx] != STATE_OPENED) {
						openBlock(xx, yy);
					}
				}
			}
		}
	}
	if (checkVictory()) { //check for victory
		alert('You Win!');
		revealBoard(true);
		playing = false;
		document.getElementById("smiley").style.display = "none";
		document.getElementById("sunglass").style.display = "block";
	}
}

//Determines if this block is the win condition
function checkVictory() {
	for (var y = 0; y < ROWS; y++) {
		for (var x = 0; x < COLS; x++) {
			if (board[y][x] != BLOCK_MINE) {
				if (state[y][x] != STATE_OPENED) {
					return false;
				}
			}
		}
	}
	return true;
}

//flag the block

function flagBlock(x, y) {
	if (state[y][x] == STATE_OPENED) {
		return;
	}
	state[y][x] = 1 - state[y][x];
	if (state[y][x] == 1) {
		FLAGS = FLAGS - 1;
	} else if (state[y][x] == 0) {
		FLAGS = FLAGS + 1;
	}
	document.getElementById("FLAGS").innerHTML = FLAGS;
	
}

//reveals the board after victory or defeat has been determined

function revealBoard(victorious) {
	for (var y = 0; y < ROWS; y++) {
		for (var x = 0; x < COLS; x++) {
			if (board[y][x] == BLOCK_MINE && victorious) {
				state[y][x] = STATE_FLAGGED;
				continue;
			}
			state[y][x] = STATE_OPENED;
		}
	}
}

//This function exists to put all of the messy if statements into one method for generating the maze
function inMap(x, y) {
	if (x == 3 || x == 33) {
		return true;
	}
	if ((y == 0 || y == 27) && ((x > 2 && x < 13) || (x == 16) || (x == 18) || (x > 21 && x < 34))) {
		return true;
	}
	if ((y == 1 || y == 26) && ((x == 12) || (x == 16) || (x == 18) || (x == 22) || (x == 27) || (x == 28))) {
		return true;
	}
	if ((y == 2 || y == 25) && ((x > 4 && x < 8) || (x == 9) || (x == 10) || (x == 12) || (x == 16) || (x == 18) || (x == 22) || (x == 24) || (x == 25) || (x == 27) || (x == 28) || (x == 30) || (x == 31))) {
		return true;
	}
	if ((y == 3 || y == 24) && ((x == 5) || (x == 7) || (x == 9) || (x == 10) || (x == 12) || (x == 16) || (x == 18) || (x == 22) || (x == 24) || (x == 25) || (x == 30) || (x == 31))) {
		return true;
	}
	if ((y == 4 || y == 23) && ((x == 5) || (x == 7) || (x == 9) || (x == 10) || (x == 12) || (x == 16) || (x == 18) || (x == 22) || (x > 23 && x < 29) || (x == 30) || (x == 31))) {
		return true;
	}
	if ((y == 5 || y == 22) && ((x > 4 && x < 8) || (x == 9) || (x == 10) || (x > 11 && x < 17) || (x > 17 && x < 23) || (x > 23 && x < 29) || (x == 30) || (x == 31))) {
		return true;
	}
	if ((y == 6 || y == 21) && ((x == 30) || (x == 31))) {
		return true;
	}
	if ((y == 7 || y == 20) && ((x > 4 && x < 8) || (x > 8 && x < 17) || (x > 17 && x < 23) || (x == 24) || (x == 25) || (x > 26 && x < 32))) {
		return true;
	}
	if ((y == 8 || y == 19) && ((x == 5) || (x == 7) || (x > 8 && x < 17) || (x > 17 && x < 23) || (x == 24) || (x == 25) || (x > 26 && x < 32))) {
		return true;
	}
	if ((y == 9 || y == 18) && ((x == 5) || (x == 7) || (x == 12) || (x == 13) || (x == 24) || (x == 25) || (x == 30) || (x == 31))) {
		return true;
	}
	if ((y == 10 || y == 17) && ((x == 5) || (x == 7) || (x == 9) || (x == 10) || (x == 12) || (x == 13) || (x > 14 && x < 20) || (x == 21) || (x == 22) || (x == 24) || (x == 25) || (x == 27) || (x == 28) || (x == 30) || (x == 31))) {
		return true;
	}
	if ((y == 11 || y == 16) && ((x > 4 && x < 8) || (x == 9) || (x == 10) || (x == 12) || (x == 13) || (x == 15) || (x == 19) || (x == 21) || (x == 22) || (x == 24) || (x == 25) || (x == 27) || (x == 28) || (x == 30) || (x == 31))) {
		return true;
	}
	if ((y == 12 || y == 15) && ((x == 9) || (x == 10) || (x == 15) || (x == 19) || (x == 21) || (x == 22) || (x == 27) || (x == 28))) {
		return true;
	}
	if ((y == 13 || y == 14) && ((x > 3 && x < 8) || (x > 8 && x < 14) || (x == 15) || (x == 19) || (x > 20 && x < 26) || (x > 26 && x < 32))) {
		return true;
	}
}

function isBlank(x, y) {
	if (x == 0 || x == 1 || x == 2 || x == 35 || x == 34) {
		return true;
	}
	if (((y > -1 && y < 5) || (y > 22 && y < 28)) && ((x > 12 && x < 16) || (x > 18 && x < 22))) {
		return true;
	}
	if ((x == 6) && ((y == 3) || (y == 4) || (y == 8) || (y == 9) || (y == 10) || (y == 17) || (y == 18) || (y == 19) || (y == 23) || (y == 24))) {
		return true;
	}
	if (((x == 16) ||(x == 17) || (x == 18)) && ((y > 10 && y < 17))) {
		return true;
	}
}
init();
