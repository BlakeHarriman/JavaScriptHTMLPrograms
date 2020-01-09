var COLS = 28, ROWS = 36, MINES = 13, FLAGS = 13; //FLAGS variable used for tracker in HTML
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
		alert('Game Over');
		playing = false;
		revealBoard(false);
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
		alert('You Win!');
		revealBoard(true);
		playing = false;
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
	if (state[y][x] == STATE_OPENED) {
		return;
	}
	state[y][x] = 1 - state[y][x];
	if (state[y][x] == 1) {
		FLAGS = FLAGS - 1;
	} else if (state[y][x] == 0) {
		FLAGS = FLAGS + 1;
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
init();
