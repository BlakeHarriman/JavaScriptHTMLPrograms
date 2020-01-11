var W = 448, H = 576;
COLS = 28;
ROWS = 36;
log = 3;
var BLOCK_W = W / COLS,
	BLOCK_H = H / ROWS;
var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d');
	
var colors = [
		'blue', 'darkgreen', 'red', 'navyblue', 'darkgred', 'cyan', 'purple', 'black'
		];
	
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
		ctx.fillRect(viewCoordinates.y, viewCoordinates.x, BLOCK_W, BLOCK_H);
		ctx.strokeRect(viewCoordinates.y, viewCoordinates.x, BLOCK_W, BLOCK_H);
	} else if (state == 2) {
		//if (nextState == 0) {
		//	xv = 0;
		//	yv = 0;
		//}
		ctx.fillStyle = 'yellow';
		
		ctx.strokeStyle = 'yellow';
		ctx.beginPath();
		ctx.arc(viewCoordinates.y + BLOCK_W/2, viewCoordinates.x + BLOCK_H/2, 5, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
	} else if (state == 1) {
		ctx.fillStyle = '#FFDAB9';
		
		ctx.strokeStyle = '#FFDAB9';
		ctx.beginPath();
		ctx.arc(viewCoordinates.y + BLOCK_W/2, viewCoordinates.x + BLOCK_H/2, 3, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
	}
}

//Renders the board

function render() {
	ctx.fillStyle="black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	if (px == 17 && ((py + yv) == 28)) {
		state[py][px] = -1;
		py = 0;
	}
	if (px == 17 && ((py + yv) == -1)) {
		state[py][px] = -1;
		py = 27;
	}
	if (state[py+yv][px+xv] == 0) {
			xv = 0; yv = 0;
	}
	px+=xv;
	py+=yv;
	if (state[py][px] != 0) {
		state[py][px] = 2;
		if (xv != 0 || yv != 0) {
			state[py-yv][px-xv] = -1;
		}
	}
	for (var y = 0; y < COLS; y++) {
		for (var x = 0; x < ROWS; x++) {
			if (log == 3 && state[y][x] == 2) {
				console.log("PX: " + px);
				console.log("PY: " + py);
				console.log("Seperate");
				console.log("X: " + x);
				console.log("Y: " + y);
				console.log("STATE: " + state[y][x]);
			}
			renderBlock(x, y, state[y][x]);
		}
	}
}

render();
if (log == 2) {
	for (var y = 0; y < COLS; y++) {
			for (var x = 0; x < ROWS; x++) {
				console.log("X: " + x);
				console.log("Y: " + y);
				console.log("STATE: " + state[y][x]);
			}
	}
}
log = 1;
setInterval(render, 1000/10);
