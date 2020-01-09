var COLS = 10, ROWS = 10, MINES = 11, DEAD = false, FLAGS = 11;//FLAGS variable used for tracker in HTML
document.getElementById("FLAGS").innerHTML = FLAGS;
document.getElementById("dead").style.display = "none";
document.getElementById("sunglass").style.display = "none";
var board = [];
var state = [];
var STATE_CLOSED = 0,
	STATE_OPENED = 2,
	STATE_FLAGGED = 1;
var BLOCK_MINE = -1;
var playing = true;

//Checks to make sure tha the coordinates are in bounds

function inBounds(x, y) {
	return x >= 0 && y >= 0 && x < COLS && y < ROWS;
}

//Counts the number of mines around each block to determine the number for that block

function countMinesAround(x, y) {
	var count = 0;
	for (var dx = -1; dx <= 1; dx++) {
		for (var dy = -1; dy <= 1; dy++) {
			if (dx == 0 && dy == 0) {
				continue;
			}
			var yy = y + dy,
				xx = x + dx;
			if (inBounds(xx, yy)) {
				if (board[yy][xx] == BLOCK_MINE) {
				count++;
				}
			}
		}
	}
	return count;
}

//Initializes the board and state to empty and closed state

function init() {
	for (var y = 0; y < COLS; y++) {
		board.push([]);
		state.push([]);
		for (var x = 0; x < ROWS; x++) {
			board[y].push(0);
			state[y].push(STATE_CLOSED);
		}
	}
	
	for (var mine = 0; mine < MINES; mine++) {
		var x, y;
		do {
			x = Math.floor(Math.random() * COLS), y = Math.floor(Math.random() * ROWS);
		
		} while (board[y][x] == BLOCK_MINE); //chooses random blocks to be mines
		
		board[y][x] = BLOCK_MINE;
	}
	
	for (var y = 0; y < ROWS; y++) {
		for (var x = 0; x < COLS; x++) {
			if (board[y][x] != BLOCK_MINE) {
				board[y][x] = countMinesAround(x, y);
			}
		}
	}
}

//Opens the block when it is clicked on

function openBlock(x, y) {
	if (!playing) {
		return;
	}
	
	if (state[y][x] == STATE_FLAGGED) { //If it is flagged then don't open it
		return;
	}
	if (board[y][x] == BLOCK_MINE) { //If it is a mine then game over
		playing = false;
		revealBoard(false);
		DEAD = true;
		document.getElementById("smiley").style.display = "none";
		document.getElementById("dead").style.display = "block";
		return;
	}
	
	state[y][x] = STATE_OPENED;
	if (board[y][x] == 0) {
		for (var dx = -1; dx <= 1; dx++) {
			for (var dy = -1; dy <= 1; dy++) {
				var xx = x + dx,
					yy = y + dy;
				if (inBounds(xx, yy)) {
					if (state[yy][xx] != STATE_OPENED) {
						openBlock(xx, yy);
					}
				}
			}
		}
	}
	if (checkVictory()) { //check for victory
		revealBoard(true);
		playing = false;
		flagBlock(0, 0); //Called to set the FLAGS variable to 0 for HTML update
		document.getElementById("smiley").style.display = "none";
		document.getElementById("sunglass").style.display = "block";
	}
}

//Determines if this block is the win condition
function checkVictory() {
	for (var y = 0; y < ROWS; y++) {
		for (var x = 0; x < COLS; x++) {
			if (board[y][x] != BLOCK_MINE) {
				if (state[y][x] != STATE_OPENED) {
					return false;
				}
			}
		}
	}
	return true;
}

//flag the block

function flagBlock(x, y) {
	if (playing) {
		if (state[y][x] == STATE_OPENED) {
			return;
		}
		state[y][x] = 1 - state[y][x];
		if (state[y][x] == 1) {
			FLAGS = FLAGS - 1;
		} else if (state[y][x] == 0) {
			FLAGS = FLAGS + 1;
		}
	} else if (!playing && !DEAD) {
		FLAGS = 0;
	}
	document.getElementById("FLAGS").innerHTML = FLAGS;
	
}

//reveals the board after victory or defeat has been determined

function revealBoard(victorious) {
	for (var y = 0; y < ROWS; y++) {
		for (var x = 0; x < COLS; x++) {
			if (board[y][x] == BLOCK_MINE && victorious) {
				state[y][x] = STATE_FLAGGED;
				continue;
			}
			state[y][x] = STATE_OPENED;
		}
	}
}

function reset() {
	seconds = -1;
	board = [];
	state = [];
	playing = true;
	DEAD = false;
	FLAGS = 11;
	document.getElementById("FLAGS").innerHTML = FLAGS;
	document.getElementById("smiley").style.display = "block";
	document.getElementById("sunglass").style.display = "none";
	document.getElementById("dead").style.display = "none";
	init();
	render();
}

init();
