var W = 448, H = 576;
COLS = 28;
ROWS = 36;
log = 3;
var blinkyKey = 37;
var clydeKey = 39;
keyBuffer = [];
var BLOCK_W = W / COLS,
	BLOCK_H = H / ROWS;
var chasing = false;
var changeKey = 0;
//var canvas = document.getElementById('canvas'),
//	ctx = canvas.getContext('2d');
	
var colors = [
		'blue', 'darkgreen', 'red', 'navyblue', 'darkgred', 'cyan', 'purple', 'black'
		];

function getDestination() {
	return [432, 528];
}

var blinkyUpdate = function() {
	coord = getDestination();
	xCoord = coord[0];
	yCoord = coord[1];
	if (chasing == false) {
		path = getPath();
		console.log(path);
		chasing = true;
	}
	intersection = 0;
	if (blinky.willCollide(-1, 0, 1, 1) && !isTouchingRight(blinky.x, blinky.y, blinky.direction)) { //Left Arrow
		intersection++;
	}
	if (blinky.willCollide(0, 1, 0, 3) && !isTouchingBottom(blinky.x, blinky.y, blinky.direction)) { //Up Arrow
		intersection++;
	}
	if (blinky.willCollide(1, 0, 1, 2) && !isTouchingLeft(blinky.x, blinky.y, blinky.direction)) { //Right Arrow
		intersection++;
	}
	if (blinky.willCollide(0, -1, 0, 4) && !isTouchingTop(blinky.x, blinky.y, blinky.direction)) { //Down Arrow
		intersection++;
	}
	//var key = Math.floor(Math.random() * (40 - 37 + 1) + 37);
	/*if (blinky.x < xCoord && blinky.willCollide(1, 0, 1, 2) && !isTouchingLeft(blinky.x, blinky.y, blinky.direction)) {
		blinky.velocityX = 1; //Right arrow
		blinky.velocityY = 0;
		blinky.direction = 1;
		blinky.keyPress = 2;
	} else if (blinky.y < yCoord && blinky.willCollide(0, -1, 0, 4) && !isTouchingTop(blinky.x, blinky.y, blinky.direction)) {
		blinky.velocityX = 0; //Down arrow
		blinky.velocityY = -1;
		blinky.direction = 0;
		blinky.keyPress = 4;
	}*/
	if (changeKey == 20) {
	if (intersection >= 3 || (blinky.velocityX == 0 && blinky.velocityY == 0)) {
		var checkAgain = true;
		var newKey = Math.floor(Math.random() * (40 - 37 + 1) + 37);
		while (checkAgain) {
			newKey = Math.floor(Math.random() * (40 - 37 + 1) + 37);
			if (Math.abs(blinkyKey - newKey) != 2) {
				checkAgain = false;
			}
			
			if (newKey === 37 && isTouchingRight(blinky.x, blinky.y, blinky.direction)) {
				checkAgain = true;
			}
			if (newKey === 38 && isTouchingBottom(blinky.x, blinky.y, blinky.direction)) {
				checkAgain = true;
			}
			if (newKey === 39 && isTouchingLeft(blinky.x, blinky.y, blinky.direction)) {
				checkAgain = true;
			}
			if (newKey === 40 && isTouchingTop(blinky.x, blinky.y, blinky.direction)) {
				checkAgain = true;
			}
		}
		blinkyKey = newKey;
	}
	
	temp = path.shift();
	if (temp == "North") {
		blinkyKey = 38;
	} else if (temp == "South") {
		blinkyKey = 40;
	} else if (temp == "East") {
		blinkyKey = 39;
	} else if (temp == "West") {
		blinkyKey = 37;
	} else {
		blinkyKey = 83;
	}
		changeKey = 0;
	}
	
	if(blinkyKey === 37){ //Left Arrow
		if (blinky.willCollide(-1, 0, 1, 1) && !isTouchingRight(blinky.x, blinky.y, blinky.direction)) {
			blinky.velocityX = -1;
			blinky.velocityY = 0;
			blinky.direction = 1;
			blinky.keyPress = 1;
		}
	} else if(blinkyKey === 38){ //Up Arrow
		if (blinky.willCollide(0, 1, 0, 3) && !isTouchingBottom(blinky.x, blinky.y, blinky.direction)) {
			blinky.velocityX = 0;
			blinky.velocityY = 1;
			blinky.direction = 0;
			blinky.keyPress = 3;
			//console.log("UP");
		}
	} else if(blinkyKey === 39){ //Right Arrow
		if (blinky.willCollide(1, 0, 1, 2) && !isTouchingLeft(blinky.x, blinky.y, blinky.direction)) {
			blinky.velocityX = 1;
			blinky.velocityY = 0;
			blinky.direction = 1;
			blinky.keyPress = 2;
		}
	} else if(blinkyKey === 40){ //Down Arrow
		if (blinky.willCollide(0, -1, 0, 4) && !isTouchingTop(blinky.x, blinky.y, blinky.direction)) {
			blinky.velocityX = 0;
			blinky.velocityY = -1;
			blinky.direction = 0;
			blinky.keyPress = 4;
		}
	} else if (blinkyKey === 83) {
		blinky.velocityX = 0;
		blinky.velocityY = 0;
	}
	changeKey++;
}

var clydeUpdate = function() {
	coord = getDestination();
	xCoord = coord[0];
	yCoord = coord[1];
	intersection = 0;
	if (clyde.willCollide(-1, 0, 1, 1) && !isTouchingRight(clyde.x, clyde.y, clyde.direction)) { //Left Arrow
		intersection++;
	}
	if (clyde.willCollide(0, 1, 0, 3) && !isTouchingBottom(clyde.x, clyde.y, clyde.direction)) { //Up Arrow
		intersection++;
	}
	if (clyde.willCollide(1, 0, 1, 2) && !isTouchingLeft(clyde.x, clyde.y, clyde.direction)) { //Right Arrow
		intersection++;
	}
	if (clyde.willCollide(0, -1, 0, 4) && !isTouchingTop(clyde.x, clyde.y, clyde.direction)) { //Down Arrow
		intersection++;
	}
	
	if (intersection >= 3 || (clyde.velocityX == 0 && clyde.velocityY == 0)) {
		var checkAgain = true;
		var newKey = Math.floor(Math.random() * (40 - 37 + 1) + 37);
		while (checkAgain) {
			newKey = Math.floor(Math.random() * (40 - 37 + 1) + 37);
			if (Math.abs(clydeKey - newKey) != 2) {
				checkAgain = false;
			}
			
			if (newKey === 37 && isTouchingRight(clyde.x, clyde.y, clyde.direction)) {
				checkAgain = true;
			}
			if (newKey === 38 && isTouchingBottom(clyde.x, clyde.y, clyde.direction)) {
				checkAgain = true;
			}
			if (newKey === 39 && isTouchingLeft(clyde.x, clyde.y, clyde.direction)) {
				checkAgain = true;
			}
			if (newKey === 40 && isTouchingTop(clyde.x, clyde.y, clyde.direction)) {
				checkAgain = true;
			}
		}
		clydeKey = newKey;
	}
	if(clydeKey === 37){ //Left Arrow
		if (clyde.willCollide(-1, 0, 1, 1) && !isTouchingRight(clyde.x, clyde.y, clyde.direction)) {
			clyde.velocityX = -1;
			clyde.velocityY = 0;
			clyde.direction = 1;
			clyde.keyPress = 1;
		}
	} else if(clydeKey === 38){ //Up Arrow
		if (clyde.willCollide(0, 1, 0, 3) && !isTouchingBottom(clyde.x, clyde.y, clyde.direction)) {
			clyde.velocityX = 0;
			clyde.velocityY = 1;
			clyde.direction = 0;
			clyde.keyPress = 3;
			//console.log("UP");
		}
	} else if(clydeKey === 39){ //Right Arrow
		if (clyde.willCollide(1, 0, 1, 2) && !isTouchingLeft(clyde.x, clyde.y, clyde.direction)) {
			clyde.velocityX = 1;
			clyde.velocityY = 0;
			clyde.direction = 1;
			clyde.keyPress = 2;
		}
	} else if(clydeKey === 40){ //Down Arrow
		if (clyde.willCollide(0, -1, 0, 4) && !isTouchingTop(clyde.x, clyde.y, clyde.direction)) {
			clyde.velocityX = 0;
			clyde.velocityY = -1;
			clyde.direction = 0;
			clyde.keyPress = 4;
		}
	} else if (key === 83) {
		clyde.velocityX = 0;
		clyde.velocityY = 0;
	}
}

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
			//console.log("HHHHHHHHHHHH");
			if(pacman.keyPress == 2) {
				keyBuffer.shift();
			}
			pacman.velocityX = -1;
			pacman.velocityY = 0;
			pacman.direction = 1;
			pacman.keyPress = 1;
			//console.log("LEFT");
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
			if(pacman.keyPress == 4) {
				keyBuffer.shift();
			}
			pacman.velocityX = 0;
			pacman.velocityY = 1;
			pacman.direction = 0;
			pacman.keyPress = 3;
			//console.log("UP");
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
			if(pacman.keyPress == 1) {
				keyBuffer.shift();
			}
			pacman.velocityX = 1;
			pacman.velocityY = 0;
			pacman.direction = 1;
			pacman.keyPress = 2;
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
			if(pacman.keyPress == 3) {
				keyBuffer.shift();
			}
			pacman.velocityX = 0;
			pacman.velocityY = -1;
			pacman.direction = 0;
			pacman.keyPress = 4;
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
	blinkyUpdate();
	clydeUpdate();
	drawMap();
	touching = 0;
	wallCollision();
	pelletCollision(pacman.x, pacman.y, pacman.direction);
	teleport();
	pacman.newPos();
	pacman.update();
	blinky.newPos();
	blinky.update();
	clyde.newPos();
	clyde.update();
	
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
