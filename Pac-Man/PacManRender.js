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
			/*pacman.velocityX = -1;
			pacman.velocityY = 0;
			pacman.direction = 1;
			keyPress = 1;*/
		if (pacman.willCollide(-1, 0, 1, 1) && !isTouchingRight(pacman.x, pacman.y, pacman.direction)) {
			console.log("HHHHHHHHHHHH");
			if(keyPress == 2) {
				keyBuffer.shift();
			}
			pacman.velocityX = -1;
			pacman.velocityY = 0;
			pacman.direction = 1;
			keyPress = 1;
			console.log("LEFT");
		} else if(keyBuffer[0] != 39 && pacman.velocityY != 0) {
			keyBuffer.push(key);
		}
		/*if (map[px][py-1] != 0) {
			xv=0; yv=-1;
		} else if (keyBuffer[0] != 39) {
			keyBuffer.push(key);
		}*/
	} else if(key === 38){ //Up Arrow
		//py--;
			/*pacman.velocityX = 0;
			pacman.velocityY = 1;
			pacman.direction = 0;
			keyPress = 3;*/
		if (pacman.willCollide(0, 1, 0, 3) && !isTouchingBottom(pacman.x, pacman.y, pacman.direction)) {
			if(keyPress == 4) {
				keyBuffer.shift();
			}
			pacman.velocityX = 0;
			pacman.velocityY = 1;
			pacman.direction = 0;
			keyPress = 3;
			console.log("UP");
		} else if(keyBuffer[0] != 40 && pacman.velocityX != 0) {
			keyBuffer.push(key);
		}
		/*if (map[px-1][py] != 0) {
			xv=-1; yv=0;
		} else if (keyBuffer[0] != 40) {
			keyBuffer.push(key);
		}*/
	} else if(key === 39){ //Right Arrow
		//px++;
			/*pacman.velocityX = 1;
			pacman.velocityY = 0;
			pacman.direction = 1;
			keyPress = 2;*/
		if (pacman.willCollide(1, 0, 1, 2) && !isTouchingLeft(pacman.x, pacman.y, pacman.direction)) {
			if(keyPress == 1) {
				keyBuffer.shift();
			}
			pacman.velocityX = 1;
			pacman.velocityY = 0;
			pacman.direction = 1;
			keyPress = 2;
			console.log("RIGHT");
		} else if(keyBuffer[0] != 37 && pacman.velocityY != 0) {
			keyBuffer.push(key);
		}
		/*if(map[px][py+1] != 0) {
			xv=0; yv=1;
		} else if (keyBuffer[0] != 37) {
			keyBuffer.push(key);
		}*/
	} else if(key === 40){ //Down Arrow
		//py++;
			/*pacman.velocityX = 0;
			pacman.velocityY = -1;
			pacman.direction = 0;
			keyPress = 4;*/
		if (pacman.willCollide(0, -1, 0, 4) && !isTouchingTop(pacman.x, pacman.y, pacman.direction)) {
			if(keyPress == 3) {
				keyBuffer.shift();
			}
			pacman.velocityX = 0;
			pacman.velocityY = -1;
			pacman.direction = 0;
			keyPress = 4;
			console.log("DOWN");
		} else if(keyBuffer[0] != 38 && pacman.velocityX != 0) {
			keyBuffer.push(key);
		}
		/*if (map[px+1][py] != 0) {
			xv=1; yv=0;
		} else if (keyBuffer[0] != 38) {
			keyBuffer.push(key);
		}*/
	} else if (key === 83) {
		pacman.velocityX = 0;
		pacman.velocityY = 0;
	}
}

function updateGame() {
	maze.clear();
	update();
	drawMap();
	touching = 0;
	wallCollision();
	pelletCollision(pacman.x, pacman.y, pacman.direction);
	teleport();
	pacman.newPos();
	pacman.update();
	blinky.newPos();
	blinky.update();
	
	//console.log("Pacman X: " + pacman.x);
	//console.log("Pacman Y: " + pacman.y);
	/*ctx.fillStyle = "yellow";
	ctx.fillRect(pacman.x, pacman.y - 16, 2, 2); //top right
	ctx.fillRect(pacman.x - 16, pacman.y - 16, 2, 2); //top left
	ctx.fillRect(pacman.x - 16, pacman.y, 2, 2); //bottom left
	ctx.fillRect(pacman.x, pacman.y, 2, 2); //bottom right
	
	ctx.fillRect(pacman.x - 8, pacman.y - 16, 2, 2); //top middle
	ctx.fillRect(pacman.x, pacman.y - 8, 2, 2); //right middle
	ctx.fillRect(pacman.x - 16, pacman.y - 8, 2, 2); //left middle
	ctx.fillRect(pacman.x - 8, pacman.y, 2, 2); //bottom middle*/
}
updateGame();
setInterval(updateGame, 10);
//render();
log = 1;
//setInterval(render, 1000/15);
