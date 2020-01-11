window.onload=function() {
	canv=document.getElementById("gc");
	ctx=canv.getContext("2d");
	document.addEventListener("keydown", keyPush);
	setInterval(game, 1000/15);
}
fill = 1;
score = 0;
px=py=10;
gs=22;
tc=27;
ax=ay=15;
xv=0; yv=1;
keyBuffer =[];
pellets = [];
walls = [];
dead = false;
won = false;


function fillWalls() {
/*	for (x = 0; x < 448; x++) {
		for (y = 0; y < 576; y++) {
			if (inMap(x*gs, y*tc)) {
				console.log("HELLO");
				ctx.fillStyle="blue";
				ctx.fillRect(x*gs, y*tc, 12, 12);
			}
		}
	}*/
}

function fillPellets() {

}

var update = function() {
    // *** Extract next key from buffer, and only treat that one
    // -- could be `undefined`, but that is not a problem:
    var key = keyBuffer.shift();
	if (!dead && !won) {
		if((!(xv == 1 && yv == 0)) && key === 37){
			xv=-1; yv=0;
		} else if((!(xv == 0 && yv == 1)) && key === 38){
			xv=0; yv=-1;
		} else if((!(xv == -1 && yv == 0)) && key === 39){
			xv=1; yv=0;
		} else if((!(xv == 0 && yv == -1)) && key === 40){
			xv=0; yv=1;
		}
	} else {
		if (key === 82) {
			score = 0;
			px=py=10;
			gs=tc=20;
			ax=ay=15;
			xv=0; yv=1;
			keyBuffer =[];
			dead = false;
			won = false;
			document.getElementById("overlay").style.display = "none";
			document.getElementById("win").style.display = "none";
		}
	}
};

function game() {
	if (fill == 1) {
		fillWalls();
		fill = 0;
	}
	update();
	px+=xv;
	py+=yv;
	if (px < 0) {
		px=tc-1;
	}
	if (px > tc-1) {
		px=0;
	}
	if (py < 0) {
		py=tc-1;
	}
	if (py > tc-1) {
		py=0;
	}
	ctx.fillStyle="black";
	ctx.fillRect(0, 0, canv.width, canv.height);
	ctx.fillStyle = 'yellow';
	ctx.strokeStyle = 'yellow';
	ctx.beginPath();
	ctx.arc(px*gs, py*gs, 10, 0, 2 * Math.PI);
	console.log(px*gs);
	ctx.fill();
	ctx.stroke();
	//ctx.fillRect(px*gs, py*gs, gs-2, gs-2);

	if (ax==px && ay==py) {
			score++;
			if (score == 400) {
				won = true;
				document.getElementById("win").style.display = "block";
			}
	}
	//document.getElementById("SCORE").innerHTML = score;
	//document.getElementById("SCORE2").innerHTML = score;
	//document.getElementById("SCORE3").innerHTML = score;
	ctx.fillStyle="red";
	ctx.fillRect(ax*gs, ay*gs, gs-2, gs-2);
}

function keyPush(evt) {
	keyCode = evt.keyCode;
	// *** Queue the arrow key presses
	if (keyCode !== keyBuffer[keyBuffer.length-1]) {
		keyBuffer = keyBuffer.slice(-3).concat(keyCode);
	}
}

function inMap(x, y) {
	if (y == 3*tc || y == 33*tc || ((x == 13*gs || x == 14*gs) && y > 2*tc && y < 8*tc)) {
		return true;
	}
	if (((y > 3 && y < 13) || (y > 21 && y < 34)) && (x == 0 || x == 27)) {
		return true;
	}
	if ((y == 22 || y == 18 || y == 16 || y == 12) && ((x > -1 && x < 6) || (x > 21 && x < 28))) {
		return true;
	}
	if ((x == 5 || x == 22) && ((y > 17 && y < 23) || (y < 17 && y > 11))) {
		return true;
	}
	if ((x == 7 || x == 8 || x == 19 || x == 20) && ((y > 26 && y < 32) || (y > 23 && y < 26) || (y > 17 && y < 23)
		|| (y > 8 && y < 17))) {
		return true;
	}
	if ((y == 5 || y == 7) && ((x > 1 && x < 6) || (x > 6 && x < 12) || (x > 15 && x < 21) || (x > 21 && x < 26))) {
		return true;
	}
	if (y == 6 && (x == 2 || x == 5 || x == 7 || x == 11 || x == 16 || x == 20 || x == 22 || x == 25)) {
		return true;
	}
	if ((y == 9 || y == 10) && ((x > 1 && x < 6) || (x > 9 && x < 18) || (x > 18 && x < 21) || (x > 21 && x < 26))) {
		return true;
	}
	if ((y == 28 || y == 27 || y == 22 || y == 21) && ((x > 9 && x < 18))) {
		return true;
	}
	if ((y == 31 || y == 30) && ((x > 1 && x < 12) || (x > 15 && x < 26))) {
		return true;
	}
	if ((x == 13 || x == 14) && ((y > 10 && y < 14) || (y > 22 && y < 26) || (y > 28 && y < 32))) {
		return true;
	}
	if ((y == 12 || y == 13) && ((x > 8 && x < 12) || (x > 15 && x < 19))) {
		return true;
	}
	if ((y == 25 || y == 24) && ((x > 1 && x < 6) || (x > 8 && x < 12) || (x > 15 && x < 19) || (x > 21 && x < 26))) {
		return true;
	}
	if ((x == 4 || x == 5 || x == 23 || x == 22) && (y > 25 && y < 29)) {
		return true;
	}
	if ((y == 28 || y == 27) && ((x > 0 && x < 3) || (x > 24 && x < 27))) {
		return true;
	}
	if ((y == 15 || y == 19) && (x > 9 && x < 18)) {
		return true;
	}
	if ((x == 10 || x == 17) && ((y > 15 && y < 19))) {
		return true;
	}
}