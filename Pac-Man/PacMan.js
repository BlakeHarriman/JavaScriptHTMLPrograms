var COLS = 28, ROWS = 36;
var board = [];
var state = [];
var BLANK = -1
var WALL = 0;
var PELLET = 1;
var PACMAN = 2;
var playing = true;
var pacman;
speed = 0;

px=26;
py=13;
gs=tc=20;
xv=0; yv=0;

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
	this.speed = speed;
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
			this.x += this.speed * Math.sin(this.angle);
			this.y -= this.speed * Math.cos(this.angle);
		} else if (this.direction == 1) {
			//tmp = this.speed;
			//this.speed = tmp * 2
			this.x += this.speed * Math.cos(this.angle);
			this.y -= this.speed * Math.sin(this.angle);
			//this.speed = tmp;
		}
		if (Math.round(this.x) - 25 == 0 || Math.round(this.x) == 460 || Math.round(this.y) - 25 == 0 || Math.round(this.y) == 576 + 10) {
			pacman.speed = 0;
		}
		if (Math.round(this.x) == 448 - 5) {
			//pacman.speed = 0;
			//console.log("REKTTTTTT");
		}
		//console.log("X: " + this.x);
		//console.log("Y: " + this.y);
    }
	
	this.willCollide = function(speed, direction) {
		if (direction == 0) {
			x = this.x + (speed * Math.sin(this.angle));
			y = this.y - (speed * Math.cos(this.angle));
		} else if (direction == 1) {
			//tmp = this.speed;
			//this.speed = tmp * 2
			x = this.x + (speed * Math.cos(this.angle));
			y = this.y - (speed * Math.sin(this.angle));
			//this.speed = tmp;	
		}
		for (i = 0; i < ROWS; i++) {
			for (j = 0; j < COLS; j++) {
				if (map[i][j] == 0) {
					if ((x - 8 == 16 * j || x + 8 == 16 * j) || (y - 8 == 16 * i || y + 8 == 16 * i)) {
						return true;
						//console.log("Collide");
					}
					//ctx.fillRect(16 * j, 16 * i, 16, 16);
				}
			}
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

function wallCollision() {
	for (i = 0; i < ROWS; i++) {
		for (j = 0; j < COLS; j++) {
			if (map[i][j] == 0) {
				if ((pacman.x - 25 == 16 * j + 16 && pacman.y - 18 == 16 * i + 7) && (pacman.direction == 1)) {// || (pacman.x - 25 == 16 * j + 16 && pacman.y - 25 == 16 * i + 16)) {
					return true;
					//console.log("Collide");
				} else if ((pacman.x - 18 == 16 * j + 8 && pacman.y - 25 == 16 * i +16) && (pacman.direction == 0)) {
					return true;
				}
				ctx.fillStyle = "red";
				ctx.fillRect(16 * j + 16, 16 * i + 8, 1, 1);
				ctx.fillRect(16 * j + 8, 16 * i + 16, 1, 1);
				//ctx.fillRect(16 * j + 16, 16 * i, 1, 1);
				//ctx.fillRect(16 * j, 16 * i + 16, 1, 1);
			}
		}
	}
	return false;
}


function init() {
	pacman = new component (35, 35, "yellow", 242, 441, "pac");
	//blinky = new component (5, 5, "red", 16, 12, "ghost");
	//inky = new component (5, 5, "blue", 16, 13, "ghost");
	//pinky = new component (5, 5, "pink", 16, 14, "ghost");
	//clyde = new component (5, 5, "orange", 16, 15, "ghost");
	maze.start();
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
