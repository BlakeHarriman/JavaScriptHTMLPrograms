var COLS = 28, ROWS = 36;
var board = [];
var state = [];
var BLANK = -1
var WALL = 0;
var PELLET = 1;
var PACMAN = 2;
var playing = true;
var pacman;
var touching = 0;
var blinking = 0;
var score = 0;
var lives = 3;
var oneUp = 0;
var topLeftTouching = false;
var topRightTouching = false;
var bottomLeftTouching = false;
var bottomRightTouching = false;

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
		[0,2,0,-1,-1,0,1,0,-1,-1,-1,0,1,0,0,1,0,-1,-1,-1,0,1,0,-1,-1,0,2,0],
		[0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
		[0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
		[0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
		[0,0,0,0,0,0,1,0,0,0,0,0,-1,0,0,-1,0,0,0,0,0,1,0,0,0,0,0,0,0],
		[-1,-1,-1,-1,-1,0,1,0,0,0,0,0,-1,0,0,-1,0,0,0,0,0,1,0,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,0,1,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,1,0,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,0,1,0,0,-1,0,0,0,0,0,0,0,0,-1,0,0,1,0,-1,-1,-1,-1,-1],
		[0,0,0,0,0,0,1,0,0,-1,0,-1,-1,-1,-1,-1,-1,0,-1,0,0,1,0,0,0,0,0,0],
		[-1,-1,-1,-1,-1,-1,1,-1,-1,-1,0,-1,-1,-1,-1,-1,-1,0,-1,-1,-1,1,-1,-1,-1,-1,-1,-1],
		[0,0,0,0,0,0,1,0,0,-1,0,-1,-1,-1,-1,-1,-1,0,-1,0,0,1,0,0,0,0,0,0],
		[-1,-1,-1,-1,-1,0,1,0,0,-1,0,0,0,0,0,0,0,0,-1,0,0,1,0,-1,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,0,1,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,1,0,-1,-1,-1,-1,-1],
		[-1,-1,-1,-1,-1,0,1,0,0,-1,0,0,0,0,0,0,0,0,-1,0,0,1,0,-1,-1,-1,-1,-1],
		[0,0,0,0,0,0,1,0,0,-1,0,0,0,0,0,0,0,0,-1,0,0,1,0,0,0,0,0,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
		[0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
		[0,2,1,1,0,0,1,1,1,1,1,1,1,-1,-1,1,1,1,1,1,1,1,0,0,1,1,2,0],
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
	this.keyPress = 0;
	this.update = function() {
        ctx = maze.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = color;
		if (type == "pac") {
			ctx.strokeStyle = 'yellow';
			ctx.fillStyle = 'yellow';
			ctx.beginPath();
			ctx.arc(this.width / -2 + 9, this.height / -2 + 9, 6, 0, 2 * Math.PI);
			//console.log("WIDTH: " + this.width / -2);
			//console.log("HEIGHT: " + this.height / -2);
			ctx.fill();
			ctx.stroke();
			//ctx.fillStyle = "green";
			//ctx.fillRect(this.width / -2 + 1, this.width / -2 + 1, 16, 16);
		} else if (type == "ghost") {
			ctx.fillStyle = 'red';
			//ctx.beginPath();
			//ctx.arc(this.width / -2 + 9, this.height / -2 + 9, 6, 0, 2 * Math.PI);
			//console.log("WIDTH: " + this.width / -2);
			//console.log("HEIGHT: " + this.height / -2);
			//ctx.fillStyle = "green";
			ctx.fillRect(this.width / -2 + 1, this.width / -2 + 1, 16, 16);
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
		//console.log("X: " + this.x);
		//console.log("Y: " + this.y);
    }
	
	this.willCollide = function(velocityX, velocityY, direction, keyPress) {
		//track = 1;
		if (direction == 0) {
			x = this.x + (velocityX * Math.sin(this.angle));
			y = this.y - (velocityY * Math.cos(this.angle));
			/*if (keyPress == 3) {
				y += 1;
			} else if (keyPress == 4) {
				y -= 1;
			}*/
		} else if (direction == 1) {
			x = this.x + (velocityX * Math.cos(this.angle));
			y = this.y - (velocityY * Math.sin(this.angle));
			/*if (keyPress == 1) {
				x += 1;
			} else if (keyPress == 2) {
				x -= 1;
			}*/
		}
		//console.log("Next X: " + (x));
		//console.log("Next Y: " + (y));
		touching = 0;
		if (isMakingContact(x, y, direction) >= 2) {
			console.log("HURRAY");
			return true;
		}
		/*
		if (isTouchingLeft(x, y, direction)) {
			console.log("LEFT NICE");
		}
		if (isTouchingRight(x, y, direction)) {
			console.log("RIGHT NICE");
		}
		if (isTouchingTop(x, y, direction)) {
			console.log("TOP NICE");
		}
		if (isTouchingBottom(x, y, direction)) {
			console.log("BOTTOM NICE");
		}
		if ((isTouchingLeft(x, y, direction)) && (isTouchingRight(x, y, direction)) && (isTouchingTop(x, y, direction)) && (isTouchingBottom(x, y, direction))) {
			//console.log("NICE");
			return true;
		}*/
		return false;
	}
}

function drawMap() {
	ctx = maze.context;
    //ctx.save();
	ctx.fillStyle = "blue";
	for (i = 0; i < ROWS; i++) {
		for (j = 0; j < COLS; j++) {
			if (map[i][j] == 0) { //Walls
				ctx.fillStyle = "blue";
				ctx.fillRect(16 * j, 16 * i, 15, 15);
			} else if (map[i][j] == 1) { //Pellets
				ctx.strokeStyle = "#FFDAB9";
				ctx.fillStyle = "#FFDAB9";
				ctx.beginPath();
				ctx.arc(16 * j + 8, 16 * i + 8, 2, 0, 2 * Math.PI);
				ctx.fill();
				ctx.stroke();
			} else if (map[i][j] == 2 && blinking <= 50) {
				ctx.strokeStyle = "#FFC0CB";
				ctx.fillStyle = "#FFC0CB";
				ctx.beginPath();
				ctx.arc(16 * j + 8, 16 * i + 8, 4, 0, 2 * Math.PI);
				ctx.fill();
				ctx.stroke();
			}
		}
	}
	blinking++
	if (blinking == 100) {
		blinking = 0;
	}
	track = 0;
	
	//Draw UI Elements
	//Score
	ctx.fillStyle = "white";
	ctx.font = "20px Arial";
	ctx.fillText("1UP", 50, 20);
	ctx.fillText("HIGH", 150, 20);
	ctx.fillText("SCORE", 240, 20);
	ctx.fillText(score, 80, 40);
	ctx.fillText(score, 260, 40);
	//Lives
	for(i = 0; i < lives - 1; i++) {
		ctx.strokeStyle = "yellow";
		ctx.fillStyle = "yellow";
		ctx.beginPath();
		ctx.arc(50 + 20 * i, 560, 6, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
	}
}

	//ctx.fillRect(pacman.x - 25, pacman.y - 25, 2, 2); //top left
	//ctx.fillRect(pacman.x - 12, pacman.y - 25, 2, 2); //top right
	//ctx.fillRect(pacman.x - 12, pacman.y - 12, 2, 2); //bottom right
	//ctx.fillRect(pacman.x - 25, pacman.y - 12, 2, 2); //bottom left

function isTouchingLeft(x, y, direction) { //Pacman touching left side of a wall
	for (i = 0; i < ROWS; i++) {
		for (j = 0; j < COLS; j++) {
			if (map[i][j] == 0) {
				if ((x == 16 * j && ((y - 8 >= 16 * i) && (y - 8 <= 16 * i + 16)))) {
					if (track == 1) {
						console.log("X: " + (x));
						console.log("Y: " + (y));
						console.log("J: " + (16 * j));
						console.log("I 1: " + (16 * i));
						console.log("I 2: " + (16 * i + 16));
						console.log("IS TOUCHING LEFT");
						track = 0;
					}
					//console.log("IS TOUCHING LEFT");
					return true;
				}
				//ctx.fillStyle = "red";
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
				if ((x - 16 == 16 * j + 16 && ((y - 8 >= 16 * i) && (y - 8 <= 16 * i + 16)))) {
					if (track == 1) {
						console.log("X: " + (x - 25));
						console.log("Y: " + (y - 25));
						console.log("J: " + (16 * j + 16));
						console.log("I 1: " + (16 * i));
						console.log("I 2: " + (16 * i + 15));
						//console.log("IS TOUCHING RIGHT");
						track = 0;
					}
					//console.log("IS TOUCHING RIGHT");
					return true;
				}
				//ctx.fillStyle = "red";
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
				if ((y == 16 * i && ((x - 8 >= 16 * j) && (x - 8 <= 16 * j + 16)))) {
					//return true;
					if (track == 1) {
						console.log("X: " + (x));
						console.log("Y: " + (y));
						console.log("I: " + (16 * i - 2));
						console.log("J 1: " + (16 * j));
						console.log("J 2: " + (16 * i + 15));
						//console.log("IS TOUCHING TOP");
						track = 0;
					}
					//console.log("IS TOUCHING TOP");
					return true;
				}
				//ctx.fillStyle = "red";
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
				if ((y - 16 == 16 * i + 16 && ((x - 8 >= 16 * j) && (x - 8 <= 16 * j + 16)))) {
					if (track == 1) {
						console.log("X: " + (x - 25));
						console.log("Y: " + (y - 25));
						console.log("I: " + (16 * i + 16));
						console.log("J 1: " + (16 * j));
						console.log("J 2: " + (16 * j + 15));
						//console.log("IS TOUCHING BOTTOM");
						track = 0;
					}
					//console.log("IS TOUCHING BOTTOM");
					return true;
				}
				//ctx.fillStyle = "red";
				for (k = 0; k < 15; k++) {
					//ctx.fillRect(16 * j + k, 16 * i + 15, 1, 1);
				}
			}
		}
	}
	return false;
}

function isMakingContact(x, y, direction) {
	//console.log("TOUCHING: " + touching);
	for (i = 0; i < ROWS; i++) {
		for (j = 0; j < COLS; j++) {
			if (map[i][j] == 0) {
				if ((y - 16 == 16 * i + 16 && ((x >= 16 * j) && (x <= 16 * j + 16))) || (x == 16 * j && ((y - 16 >= 16 * i) && (y - 16 <= 16 * i + 16)))) {
					//Top right is touching
					//touching++;
					topRightTouching = true;
				}
				if ((y - 16 == 16 * i + 16 && ((x - 16 >= 16 * j) && (x - 16 <= 16 * j +16))) || (x - 16 == 16 * j + 16 && ((y - 16 >= 16 * i) && (y - 16 <= 16 * i + 16)))) {
					//Top left is touching
					//touching++;
					topLeftTouching = true;
				}
				if ((y == 16 * i && ((x - 16 >= 16 * j) && (x - 16 <= 16 * j + 16))) || (x - 16 == 16 * j + 16 && ((y >= 16 * i) && (y <= 16 * i + 16)))) {
					//Bottom Left is touching
					//touching++;
					bottomLeftTouching = true;
				}
				if ((y == 16 * i && ((x >= 16 * j) && (x <= 16 * j + 16))) || (x == 16 * j && ((y >= 16 * i) && (y <= 16 * i + 16)))) {
					//Bottom Right is touching
					//touching++;
					bottomRightTouching = true;
				}
			}
		}
	}
	if (topRightTouching) {
		touching++;
	}
	if (topLeftTouching) {
		touching++;
	}
	if (bottomLeftTouching) {
		touching++;
	}
	if (bottomRightTouching) {
		touching++;
	}
	//console.log("TOUCHING NOW: " + touching);
	topLeftTouching = false;
	topRightTouching = false;
	bottomLeftTouching = false;
	bottomRightTouching = false;
	return touching;
	/*if (touching == 4) {
		return true;
	}
	return false;*/
}

function wallCollision() {
	/*if ((isTouchingLeft(pacman.x, pacman.y, pacman.direction)) && (isTouchingRight(pacman.x, pacman.y, pacman.direction)) && (isTouchingTop(pacman.x, pacman.y, pacman.direction)) && (isTouchingRight(pacman.x, pacman.y, pacman.direction))) {
		//console.log("CURRENTLY COLLIDING");
	}*/
	//Wall Collision for Pacman
	if ((isTouchingLeft(pacman.x, pacman.y, pacman.direction) && (pacman.keyPress == 2)) || (isTouchingRight(pacman.x, pacman.y, pacman.direction) && pacman.keyPress == 1)) {
		pacman.velocityX = 0;
	} else if ((isTouchingTop(pacman.x, pacman.y, pacman.direction) && (pacman.keyPress == 4)) || (isTouchingBottom(pacman.x, pacman.y, pacman.direction) && (pacman.keyPress == 3))) {
		pacman.velocityY = 0;
	}
	
	//Wall collision for blinky
	if ((isTouchingLeft(blinky.x, blinky.y, blinky.direction) && (blinky.keyPress == 2)) || (isTouchingRight(blinky.x, blinky.y, blinky.direction) && blinky.keyPress == 1)) {
		blinky.velocityX = 0;
	} else if ((isTouchingTop(blinky.x, blinky.y, blinky.direction) && (blinky.keyPress == 4)) || (isTouchingBottom(blinky.x, blinky.y, blinky.direction) && (blinky.keyPress == 3))) {
		blinky.velocityY = 0;
	}
	if (isMakingContact(pacman.x, pacman.y, pacman.direction) == 4) {
		//console.log("IS MAKING CONTACT");
	}
}

function pelletCollision(x, y, direction) {
	for (i = 0; i < ROWS; i++) {
		for (j = 0; j < COLS; j++) {
			if (map[i][j] == 1 || map[i][j] == 2) {
				if (((y - 16 == 16 * i + 8) && (x - 8 == 16 * j + 8)) || ((y == 16 * i + 8) && (x - 8 == 16 * j + 8)) ||
					((x - 16 == 16 * j + 8) && (y - 8 == 16 * i + 8)) || ((x == 16 * j + 8) && (y - 8 == 16 * i + 8))) {
					if (map[i][j] == 2) {
						score += 50;
						oneUp += 50;
						//Make ghosts frightened
					} else {
						score += 10;
						oneUp += 10;
					}
					map[i][j] = -1;
					if (oneUp >= 10000) {
						lives++;
						oneUp = oneUp - 10000;
					}
				}
			}
		}
	}
}

function teleport() {
	if (pacman.x == 0 && pacman.y - 16 == 272 && pacman.keyPress == 1) {
		pacman.x = 480;
	}
	if (pacman.x == 480 && pacman.y - 16 == 272 && pacman.keyPress == 2) {
		pacman.x = 0;
	}
}


function init() {
	pacman = new component (35, 35, "yellow", 233, 432, "pac");
	blinky = new component (35, 35, "red", 233, 240, "ghost");
	//inky = new component (5, 5, "blue", 16, 13, "ghost");
	//pinky = new component (5, 5, "pink", 16, 14, "ghost");
	//clyde = new component (5, 5, "orange", 16, 15, "ghost");
	maze.start();
}

init();
