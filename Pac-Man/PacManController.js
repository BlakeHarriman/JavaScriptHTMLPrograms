console.log("REEEEEEEEEE");
document.addEventListener("keydown", function(e) {
	keyCode = e.keyCode;
	// *** Queue the arrow key presses
	if ((xv != 0 && yv != 0) && (firstPress != 1)) {
		if (keyCode !== keyBuffer[keyBuffer.length-1]) {
			keyBuffer = keyBuffer.slice(-3).concat(keyCode);
		}
	}
	render();
	return false;
});

//Adds action listener
canvas.addEventListener('contextmenu', function(e) {
	e.preventDefault();
	return false;
}, false);
