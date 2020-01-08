var W = 448, H = 576;
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

//Renders a mine on the block

function renderMine(x, y) {
	var viewCoordinates = modelToView(x, y);
	
	ctx.drawImage(bombIcon, viewCoordinates.x, viewCoordinates.y, BLOCK_W, BLOCK_H);
}

//Renders a flag on the block

function renderFlag(x, y) {
	var viewCoordinates = modelToView(x, y);
	
	ctx.drawImage(flagIcon, viewCoordinates.x, viewCoordinates.y, BLOCK_W, BLOCK_H);
}

//Renders all of the numbers onto the number blocks

function renderNumber(x, y) {
	var viewCoordinates = modelToView(x, y);
	ctx.fillStyle = colors[board[y][x] - 1];
	ctx.font = '20pt Verdana';
	var textSizeM = ctx.measureText('M'),
		textSizeNumber = ctx.measureText(board[y][x]);
	ctx.fillText(board[y][x], 
	viewCoordinates.x + Math.floor(BLOCK_W / 2) - (textSizeNumber.width / 2), 
	viewCoordinates.y + Math.floor(BLOCK_H / 2) + (textSizeM.width / 2));
}

//Renders the block depending on its current state

function renderBlock(x, y) {
	var viewCoordinates = modelToView(x, y);
	if (y == 3 || y == 33 || ((x == 14 || x == 15) && y > 2 && y < 8)) {
		ctx.fillStyle = '#0000FF';
	
		ctx.strokeStyle = 'black';
		ctx.fillRect(viewCoordinates.x, viewCoordinates.y, BLOCK_W, BLOCK_H);
		ctx.strokeRect(viewCoordinates.x, viewCoordinates.y, BLOCK_W, BLOCK_H);
	}
}

//Renders the board

function render() {
	for (var y = 0; y < ROWS; y++) {
		for (var x = 0; x < COLS; x++) {
			renderBlock(x, y);
		}
	}
}

render();
