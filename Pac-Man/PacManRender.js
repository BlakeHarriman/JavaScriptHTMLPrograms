var W = 448, H = 576;
COLS = 28;
ROWS = 36;
log = 3;
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
	var key = keyBuffer.shift();
    if(key === 37){ //Left Arrow
		//py--;
		if (!pacman.willCollide(-1, 0, 1, 1)) {
			console.log("HHHHHHHHHHHH");
			pacman.velocityX = -1;
			pacman.velocityY = 0;
			pacman.direction = 1;
			keyPress = 1;
		}
		/*if (map[px][py-1] != 0) {
			xv=0; yv=-1;
		} else if (keyBuffer[0] != 39) {
			keyBuffer.push(key);
		}*/
	} else if(key === 38){ //Up Arrow
		//py--;
		if (!pacman.willCollide(0, 1, 0, 3)) {
			pacman.velocityX = 0;
			pacman.velocityY = 1;
			pacman.direction = 0;
			keyPress = 3;
		}
		/*if (map[px-1][py] != 0) {
			xv=-1; yv=0;
		} else if (keyBuffer[0] != 40) {
			keyBuffer.push(key);
		}*/
	} else if(key === 39){ //Right Arrow
		//px++;
		if (!pacman.willCollide(1, 0, 1, 2)) {
			pacman.velocityX = 1;
			pacman.velocityY = 0;
			pacman.direction = 1;
			keyPress = 2;
		}
		/*if(map[px][py+1] != 0) {
			xv=0; yv=1;
		} else if (keyBuffer[0] != 37) {
			keyBuffer.push(key);
		}*/
	} else if(key === 40){ //Down Arrow
		//py++;
		if (!pacman.willCollide(0, -1, 0, 4)) {
			pacman.velocityX = 0;
			pacman.velocityY = -1;
			pacman.direction = 0;
			keyPress = 4;
		}
		/*if (map[px+1][py] != 0) {
			xv=1; yv=0;
		} else if (keyBuffer[0] != 38) {
			keyBuffer.push(key);
		}*/
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

function updateGame() {
	maze.clear();
	update();
	drawWalls();
	drawTest();
	wallCollision();
	pacman.newPos();
	pacman.update();
	ctx.fillStyle = "yellow";
	ctx.fillRect(pacman.x - 25, pacman.y - 25, 2, 2); //top left
	ctx.fillRect(pacman.x - 12, pacman.y - 25, 2, 2); //top right
	ctx.fillRect(pacman.x - 12, pacman.y - 12, 2, 2); //bottom right
	ctx.fillRect(pacman.x - 25, pacman.y - 12, 2, 2); //bottom left
}
updateGame();
setInterval(updateGame, 10);
//render();
log = 1;
//setInterval(render, 1000/15);
