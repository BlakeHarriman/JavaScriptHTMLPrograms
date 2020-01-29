var COLS = 28, ROWS = 36;
var board = [];
var state = [];
var BLANK = -1
var WALL = 0;
var PELLET = 1;
var PACMAN = 2;
var playing = true;
var pacman;
var keyPress = 0;

px=26;
py=13;
gs=tc=20;
velocityX = 0;
velocityY = 0;
track = 1;

//Maze
var map = [
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
		[0,1,0,-1,-1,0,1,0,-1,-1,-1,0,1,0,0,1,0,-1,-1,-1,0,1,0,-1,-1,0,1,0],
		[0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
		[0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
		[0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
		[0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0],
		[-1,-1,-1,-1,-1,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,0,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,-1,-1,-1,-1,-1],
		[0,0,0,0,0,0,1,0,0,1,0,-1,-1,-1,-1,-1,-1,0,1,0,0,1,0,0,0,0,0,0],
		[1,1,1,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,0,1,1,1,1,1,1,1,1,1,1],
		[0,0,0,0,0,0,1,0,0,1,0,-1,-1,-1,-1,-1,-1,0,1,0,0,1,0,0,0,0,0,0],
		[-1,-1,-1,-1,-1,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,0,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,-1,-1,-1,-1,-1],
		[0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
		[0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
		[0,1,1,1,0,0,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,0,0,1,1,1,0],
		[0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
		[0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
		[0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
		[0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
		[0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
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
		this.canvas.width = 448;
		this.canvas.height = 576;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
	},
	
	clear: function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

function component(width, height, color, x, y, type) {
	this.width = width;
	this.height = height;
	this.color = color;
	this.x = x;
	this.y = y;
	this.type = type;
	this.velocityX = velocityX;
	this.velocityY = velocityY;
	this.angle = 0;
	this.direction = 0;
	this.update = function() {
        ctx = maze.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = color;
		if (type == "pac") {
			ctx.strokeStyle = 'yellow';
			ctx.beginPath();
			//ctx.arc(this.width / -2, this.height / -2, 7.5, 0, 2 * Math.PI);
			ctx.fill();
			ctx.stroke();
			ctx.fillStyle = "green";
			ctx.fillRect(this.width / -2 - 7.5, this.width / -2 - 7.5, 15, 15);
		} else {
			ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
		}		
        ctx.restore();    
    }
	this.newPos = function() {
		if (this.direction == 0) {
			this.x += this.velocityX * Math.sin(this.angle);
			this.y -= this.velocityY * Math.cos(this.angle);
		} else if (this.direction == 1) {
			//tmp = this.speed;
			//this.speed = tmp * 2
			this.x += this.velocityX * Math.cos(this.angle);
			this.y -= this.velocityY * Math.sin(this.angle);
			//this.speed = tmp;
		}
		if (Math.round(this.x) - 25 == 0 || Math.round(this.x) == 460 || Math.round(this.y) - 25 == 0 || Math.round(this.y) == 576 + 10) {
			//pacman.speed = 0;
		}
		if (Math.round(this.x) == 448 - 5) {
			//pacman.speed = 0;
			//console.log("REKTTTTTT");
		}
		//console.log("X: " + this.x);
		//console.log("Y: " + this.y);
    }
	
	this.willCollide = function(velocityX, velocityY, direction, keyPress) {
		track = 1;
		if (direction == 0) {
			x = this.x + (velocityX * Math.sin(this.angle));
			y = this.y - (velocityY * Math.cos(this.angle));
			if (keyPress == 3) {
				y += 1;
			} else if (keyPress == 4) {
				y -= 1;
			}
		} else if (direction == 1) {
			x = this.x + (velocityX * Math.cos(this.angle));
			y = this.y - (velocityY * Math.sin(this.angle));
			if (keyPress == 1) {
				x += 1;
			} else if (keyPress == 2) {
				x -= 1;
			}
		}
		console.log("Next X: " + (x - 25));
		console.log("Next Y: " + (y - 25));
		if (isTouchingLeft(x, y, direction) || isTouchingRight(x, y, direction) || isTouchingTop(x, y, direction) || isTouchingBottom(x, y, direction)) {
			return true;
		}
		return false;
	}
}

function drawWalls() {
	ctx = maze.context;
    //ctx.save();
	ctx.fillStyle = "blue";
	for (i = 0; i < ROWS; i++) {
		for (j = 0; j < COLS; j++) {
			if (map[i][j] == 0) {
				ctx.fillStyle = "blue";
				ctx.fillRect(16 * j, 16 * i, 15, 15);			
			}
		}
	}
}

function drawTest() {
	ctx.fillStyle = "red";
	ctx.fillRect(448 - 15, 576 - 15, 15, 15);
}

	//ctx.fillRect(pacman.x - 25, pacman.y - 25, 2, 2); //top left
	//ctx.fillRect(pacman.x - 12, pacman.y - 25, 2, 2); //top right
	//ctx.fillRect(pacman.x - 12, pacman.y - 12, 2, 2); //bottom right
	//ctx.fillRect(pacman.x - 25, pacman.y - 12, 2, 2); //bottom left

function isTouchingLeft(x, y, direction) { //Pacman touching left side of a wall
	for (i = 0; i < ROWS; i++) {
		for (j = 0; j < COLS; j++) {
			if (map[i][j] == 0) {
				if ((x - 12 == 16 * j - 3 && (((y - 25 >= 16 * i) && (y - 25 <= 16 * i + 15)) || ((y - 12 >= 16 * i) && (y - 12 <= 16 * i + 15))) && (direction == 1))) {
					return true;
					if (track == 1) {
						console.log("X: " + (x - 12));
						console.log("Y: " + (y - 25));
						console.log("J: " + (16 * j - 3));
						console.log("I 1: " + (16 * i + 1));
						console.log("I 2: " + (16 * i + 15));
						track = 0;
					}
				}
				ctx.fillStyle = "red";
				for (k = 0; k < 15; k++) {
					//ctx.fillRect(16 * j, 16 * i + k, 1, 1);
				}
			}
		}
	}
	return false;
}

function isTouchingRight(x, y, direction) { //Pacman touching right side of a wall
	for (i = 0; i < ROWS; i++) {
		for (j = 0; j < COLS; j++) {
			if (map[i][j] == 0) {
				if ((x - 25 == 16 * j + 16 && (((y - 25 >= 16 * i) && (y - 25 <= 16 * i + 15)) || ((y - 12 >= 16 * i) && (y - 12 <= 16 * i + 15)))) && (direction == 1)) {
					return true;
					if (track == 1) {
						console.log("X: " + (x - 25));
						console.log("Y: " + (y - 25));
						console.log("J: " + (16 * j + 16));
						console.log("I 1: " + (16 * i));
						console.log("I 2: " + (16 * i + 15));
						track = 0;
					}
				}
				ctx.fillStyle = "red";
				for (k = 0; k < 15; k++) {
					//ctx.fillRect(16 * j + 15, 16 * i + k, 1, 1);
				}
			}
		}
	}
	return false;
}

function isTouchingTop(x, y, direction) { //Pacman touching top side of a wall
	for (i = 0; i < ROWS; i++) {
		for (j = 0; j < COLS; j++) {
			if (map[i][j] == 0) {
				if ((y - 12 == 16 * i - 2 && (((x - 25 >= 16 * j) && (x - 25 <= 16 * j + 15)) || ((x - 12 >= 16 * j) && (x - 12 <= 16 * j + 15)))) && (direction == 0)) {
					//return true;
					if (track == 1) {
						console.log("X: " + (x - 25));
						console.log("Y: " + (y - 12));
						console.log("I: " + (16 * i - 2));
						console.log("J 1: " + (16 * j));
						console.log("J 2: " + (16 * i + 15));
						track = 0;
					}
					return true;
				}
				ctx.fillStyle = "red";
				for (k = 0; k < 15; k++) {
					//ctx.fillRect(16 * j + k, 16 * i, 1, 1);
				}
			}
		}
	}
	return false;
}

function isTouchingBottom(x, y, direction) { //Pacman touching bottom side of a wall
	for (i = 0; i < ROWS; i++) {
		for (j = 0; j < COLS; j++) {
			if (map[i][j] == 0) {
				if ((y - 25 == 16 * i + 16 && (((x - 25 >= 16 * j) && (x - 25 <= 16 * j + 15)) || ((x - 12 >= 16 * j) && (x - 12 <= 16 * j + 15)))) && (direction == 0)) {
					if (track == 1) {
						console.log("X: " + (x - 25));
						console.log("Y: " + (y - 25));
						console.log("I: " + (16 * i + 16));
						console.log("J 1: " + (16 * j));
						console.log("J 2: " + (16 * j + 15));
						console.log("IS TOUCHING BOTTOM");
						track = 0;
					}
					return true;
				}
				ctx.fillStyle = "red";
				for (k = 0; k < 15; k++) {
					//ctx.fillRect(16 * j + k, 16 * i + 15, 1, 1);
				}
			}
		}
	}
	return false;
}

function wallCollision() {
	if ((isTouchingLeft(pacman.x, pacman.y, pacman.direction) && (keyPress == 2)) || (isTouchingRight(pacman.x, pacman.y, pacman.direction) && keyPress == 1)) {
		pacman.velocityX = 0;
	} else if ((isTouchingTop(pacman.x, pacman.y, pacman.direction) && (keyPress == 4)) || (isTouchingBottom(pacman.x, pacman.y, pacman.direction) && (keyPress == 3))) {
		pacman.velocityY = 0;
	}
}


function init() {
	pacman = new component (35, 35, "yellow", 242, 441, "pac");
	//blinky = new component (5, 5, "red", 16, 12, "ghost");
	//inky = new component (5, 5, "blue", 16, 13, "ghost");
	//pinky = new component (5, 5, "pink", 16, 14, "ghost");
	//clyde = new component (5, 5, "orange", 16, 15, "ghost");
	maze.start();
}

init();
