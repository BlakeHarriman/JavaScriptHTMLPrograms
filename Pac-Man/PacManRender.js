var W = 448, H = 576;
COLS = 28;
ROWS = 36;
log = 3;
speed = 2;
keyBuffer = [];
var BLOCK_W = W / COLS,
	BLOCK_H = H / ROWS;
//var canvas = document.getElementById('canvas'),
//	ctx = canvas.getContext('2d');
	
var colors = [
		'blue', 'darkgreen', 'red', 'navyblue', 'darkgred', 'cyan', 'purple', 'black'
		];

var update = function() {
	//console.log("HELLLLLLO");
	if (xv != 0 || yv != 0) {
		firstPress = 0;
	}
	var key = keyBuffer.shift();
    if(key === 37){ //Left Arrow
		//py--;
		pacman.speed = speed * -1;
		pacman.direction = 1;
		/*if (map[px][py-1] != 0) {
			xv=0; yv=-1;
		} else if (keyBuffer[0] != 39) {
			keyBuffer.push(key);
		}*/
	} else if(key === 38){ //Up Arrow
		//py--;
		pacman.speed = speed;
		pacman.direction = 0;
		/*if (map[px-1][py] != 0) {
			xv=-1; yv=0;
		} else if (keyBuffer[0] != 40) {
			keyBuffer.push(key);
		}*/
	} else if(key === 39){ //Right Arrow
		//px++;
		pacman.speed = speed;
		pacman.direction = 1;
		/*if(map[px][py+1] != 0) {
			xv=0; yv=1;
		} else if (keyBuffer[0] != 37) {
			keyBuffer.push(key);
		}*/
	} else if(key === 40){ //Down Arrow
		//py++;
		pacman.speed = speed * -1;
		pacman.direction = 0;
		/*if (map[px+1][py] != 0) {
			xv=1; yv=0;
		} else if (keyBuffer[0] != 38) {
			keyBuffer.push(key);
		}*/
	}
	if (xv == 0 && yv == 0) {
		keyBuffer.shift();
	}
}	

//Gets the view coordinates
function modelToView(x, y) {
	return {
		x: x * BLOCK_W,
		y: y * BLOCK_H
	};
}	

//Gets the model coordinates

function viewToModel(x, y) {
	return {
	x: Math.floor(x / BLOCK_W),
	y: Math.floor(y / BLOCK_H)
	};
}

//Renders the block depending on its current state

function renderBlock(x, y, state, nextState) {
	var viewCoordinates = modelToView(x, y);
	if (state == 0) {
		ctx.fillStyle = '#0000FF';
	
		ctx.strokeStyle = 'black';
		ctx.fillRect(viewCoordinates.x, viewCoordinates.y, BLOCK_W, BLOCK_H);
		ctx.strokeRect(viewCoordinates.x, viewCoordinates.y, BLOCK_W, BLOCK_H);
	} else if (state == 2) {
		//if (nextState == 0) {
		//	xv = 0;
		//	yv = 0;
		//}
		ctx.fillStyle = 'yellow';
		
		ctx.strokeStyle = 'yellow';
		ctx.beginPath();
		ctx.arc(viewCoordinates.x + BLOCK_W/2, viewCoordinates.y + BLOCK_H/2, 5, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
	} else if (state == 1) {
		ctx.fillStyle = '#FFDAB9';
		
		ctx.strokeStyle = '#FFDAB9';
		ctx.beginPath();
		ctx.arc(viewCoordinates.x + BLOCK_W/2, viewCoordinates.y + BLOCK_H/2, 3, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
	}
}

//Renders the board

function render() {
	ctx.fillStyle="black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	if (px == 17 && ((py + yv) == 28)) {
		map[px][py] = -1;
		py = 0;
	}
	if (px == 17 && ((py + yv) == -1)) {
		map[px][py] = -1;
		py = 27;
	}
	if (map[px+xv][py+yv] == 0) {
			xv = 0; yv = 0;
	}
	px+=xv;
	py+=yv;
	if (map[px][py] != 0) {
		map[px][py] = 2;
		if (xv != 0 || yv != 0) {
			map[px-xv][py-yv] = -1;
		}
	}
	update();
	for (var y = 0; y < ROWS; y++) {
		for (var x = 0; x < COLS; x++) {
			if (log == 4) {
				console.log("X: " + x);
				console.log("Y: " + y);
				console.log("STATE: " + map[y][x]);
			}
			renderBlock(x, y, map[y][x]);
		}
	}
}
function updateGame() {
	maze.clear();
	update();
	drawWalls();
	pacman.newPos();
	pacman.update();
}
updateGame();
setInterval(updateGame, 20);
//render();
log = 1;
//setInterval(render, 1000/15);
