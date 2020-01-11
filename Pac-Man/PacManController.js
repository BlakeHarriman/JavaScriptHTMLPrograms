console.log("REEEEEEEEEE");
document.addEventListener("keydown", function(e) {
	const key = e.keyCode;
	console.log("KEYYYYYYYYYY: " + key);
    if(/*(!(xv == 1 && yv == 0)) && */key === 37){ //Left Arrow
		//py--;
		if (state[py-1][px] != 0) {
			xv=0; yv=-1;
		}
		console.log("hi");
	} else if(/*(!(xv == 0 && yv == 1)) && */key === 38){ //Up Arrow
		//py--;
		if (state[py][px-1] != 0) {
			xv=-1; yv=0;
		}
		console.log("bi");
	} else if(/*(!(xv == -1 && yv == 0)) && */key === 39){ //Right Arrow
		//px++;
		if(state[py+1][px] != 0) {
			xv=0; yv=1;
		}
		console.log("sigh");

	} else if(/*(!(xv == 0 && yv == -1)) && */key === 40){ //Down Arrow
		//py++;
		if (state[py][px+1] != 0) {
			xv=1; yv=0;
		}
		console.log("Cry");
	}
	render();
	return false;
});

//Adds action listener
canvas.addEventListener('contextmenu', function(e) {
	e.preventDefault();
	return false;
}, false);
