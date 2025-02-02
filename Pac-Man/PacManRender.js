var W = 448, H = 576;
COLS = 28;
ROWS = 36;
log = 3;
var blinkyKey = 0;
var pinkyKey = 0;
var clydeKey = 0;
keyBuffer = [];
var BLOCK_W = W / COLS,
	BLOCK_H = H / ROWS;
var blinkyChasing = false;
var pinkyChasing = false;
var changeKey = 0;
var timing = 0;
var temp = 83;
var blinkyPath = [];
var pinkyPath = [];
var clydePath = [];


function getDestination() {
	//console.log((pacman.y - 16) / 16);
	if ((pacman.y - 16) / 16 == Math.round((pacman.y - 16) / 16)) {
		if ((pacman.x - 16) / 16 == Math.round((pacman.x - 16) / 16)) {
			return [(pacman.y - 16) / 16, (pacman.x - 16) / 16]
		}
	}
	return [-1, -1];
}

var blinkyUpdate = function() {
	coord = getDestination();
	xCoord = coord[0];
	yCoord = coord[1];
	
	if ((blinky.y - 16) / 16 == Math.round((blinky.y - 16) / 16)) {
		if ((blinky.x - 16) / 16 == Math.round((blinky.x - 16) / 16)) {
			if (blinky.frightened && scaredTick > 500) {
				blinky.frightened = false;
			}
		}
	}
	
	if (xCoord != -1 && yCoord != -1 && blinkyChasing == false) {
		if ((blinky.y - 16) / 16 == Math.round((blinky.y - 16) / 16)) {
			if ((blinky.x - 16) / 16 == Math.round((blinky.x - 16) / 16)) {
				blinkyX = (blinky.y - 16) / 16;
				blinkyY = (blinky.x - 16) / 16;
			}
		}
		if (blinky.frightened) {
			blinkyPath = getPath(blinkyX, blinkyY, corners[1][0], corners[1][1]);
		} else {
			blinkyPath = getPath(blinkyX, blinkyY, xCoord, yCoord);
		}
		blinkyChasing = true;
		temp = blinkyPath.shift();
	}

	if (Math.abs(oldBlinkyX - blinky.x) >= 16 || Math.abs(oldBlinkyY - blinky.y) >= 16) {
		oldBlinkyX = blinky.x;
		oldBlinkyY = blinky.y;
		temp = blinkyPath.shift();
	}
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
	if (changeKey = 20 || blinkyPath.length == 1) {
		blinkyChasing = false;
		changeKey = 0;
	}
}

var pinkyUpdate = function() {
	coord = getDestination();
	xCoord = coord[0];
	yCoord = coord[1];
	
	if (xCoord - 4 >= 0 && yCoord >= 0 && map[xCoord - 4][yCoord] != 0) {
		xCoord = xCoord - 4;
	} else if (xCoord + 4 <= 27 && yCoord >= 0 && map[xCoord + 4][yCoord] != 0) {
		xCoord = xCoord + 4;
	} else if (xCoord >= 0 && yCoord - 4 >= 0 && map[xCoord][yCoord - 4] != 0) {
		yCoord = yCoord - 4;
	} else if (xCoord >= 0 && yCoord + 4 <= 35) {
		yCoord = yCoord + 4;
	}
	
	if ((pinky.y - 16) / 16 == Math.round((pinky.y - 16) / 16)) {
		if ((pinky.x - 16) / 16 == Math.round((pinky.x - 16) / 16)) {
			if (pinky.frightened && scaredTick > 500) {
				pinky.frightened = false;
			}
		}
	}
	
	if (xCoord >= 0 && yCoord >= 0 && map[xCoord, yCoord] != 0 && pinkyChasing == false) {
		if ((pinky.y - 16) / 16 == Math.round((pinky.y - 16) / 16)) {
			if ((pinky.x - 16) / 16 == Math.round((pinky.x - 16) / 16)) {
				pinkyX = (pinky.y - 16) / 16;
				pinkyY = (pinky.x - 16) / 16;
			}
		}
		if (pinky.frightened) {
			pinkyPath = getPath(pinkyX, pinkyY, corners[0][0], corners[0][1]);
		} else {
			pinkyPath = getPath(pinkyX, pinkyY, xCoord, yCoord);
		}
		pinkyChasing = true;
		if (pinkyPath.length > 0) {
			temp = pinkyPath.shift();
		}
	}

	if ((Math.abs(oldPinkyX - pinky.x) >= 16 || Math.abs(oldPinkyY - pinky.y) >= 16) && pinkyPath.length > 0) {
		oldPinkyX = pinky.x;
		oldPinkyY = pinky.y;
		temp = pinkyPath.shift();
	}
	if (temp == "North") {
		pinkyKey = 38;
	} else if (temp == "South") {
		pinkyKey = 40;
	} else if (temp == "East") {
		pinkyKey = 39;
	} else if (temp == "West") {
		pinkyKey = 37;
	} else {
		pinkyKey = 83;
	}
	
	if(pinkyKey === 37){ //Left Arrow
		if (pinky.willCollide(-1, 0, 1, 1) && !isTouchingRight(pinky.x, pinky.y, pinky.direction)) {
			pinky.velocityX = -1;
			pinky.velocityY = 0;
			pinky.direction = 1;
			pinky.keyPress = 1;
		}
	} else if(pinkyKey === 38){ //Up Arrow
		if (pinky.willCollide(0, 1, 0, 3) && !isTouchingBottom(pinky.x, pinky.y, pinky.direction)) {
			pinky.velocityX = 0;
			pinky.velocityY = 1;
			pinky.direction = 0;
			pinky.keyPress = 3;
			//console.log("UP");
		}
	} else if(pinkyKey === 39){ //Right Arrow
		if (pinky.willCollide(1, 0, 1, 2) && !isTouchingLeft(pinky.x, pinky.y, pinky.direction)) {
			pinky.velocityX = 1;
			pinky.velocityY = 0;
			pinky.direction = 1;
			pinky.keyPress = 2;
		}
	} else if(pinkyKey === 40){ //Down Arrow
		if (pinky.willCollide(0, -1, 0, 4) && !isTouchingTop(pinky.x, pinky.y, pinky.direction)) {
			pinky.velocityX = 0;
			pinky.velocityY = -1;
			pinky.direction = 0;
			pinky.keyPress = 4;
		}
	} else if (pinkyKey === 83) {
		pinky.velocityX = 0;
		pinky.velocityY = 0;
	}
	changeKey++;
	if (changeKey = 40 || pinkyPath.length == 1) {
		pinkyChasing = false;
		changeKey = 0;
	}
}

var clydeUpdate = function() {
	var temp = 83;
	intersection = 0;
	
	if ((clyde.y - 16) / 16 == Math.round((clyde.y - 16) / 16)) {
		if ((clyde.x - 16) / 16 == Math.round((clyde.x - 16) / 16)) {
			if (clyde.frightened && scaredTick > 500) {
				clyde.frightened = false;
				clydePath = [];
			}
		}
	}
	
	if (clyde.frightened) {
		if ((clyde.y - 16) / 16 == Math.round((clyde.y - 16) / 16)) {
			if ((clyde.x - 16) / 16 == Math.round((clyde.x - 16) / 16)) {
				clydeX = (clyde.y - 16) / 16;
				clydeY = (clyde.x - 16) / 16;
				clydePath = getPath(clydeX, clydeY, corners[2][0], corners[2][1]);
				temp = clydePath.shift();
			}
		}
	}

	if (Math.abs(oldClydeX - clyde.x) >= 16 || Math.abs(oldClydeY - clyde.y) >= 16) {
		oldClydeX = clyde.x;
		oldClydeY = clyde.y;
		temp = clydePath.shift();
	}
	if (temp == "North") {
		clydeKey = 38;
	} else if (temp == "South") {
		clydeKey = 40;
	} else if (temp == "East") {
		clydeKey = 39;
	} else if (temp == "West") {
		clydeKey = 37;
	}
	
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
	
	if ((intersection >= 3 || (clyde.velocityX == 0 && clyde.velocityY == 0)) && !clyde.frightened) {
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
	} else if (clydeKey === 83) {
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
	//pinkyUpdate();
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
	//pinky.newPos();
	//pinky.update();
	//clyde.newPos();
	//clyde.update();
	scaredTick++;
	
	
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
