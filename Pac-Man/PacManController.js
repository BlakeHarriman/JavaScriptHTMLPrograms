canvas.addEventListener('mousedown', function(e) {
	var MOUSE_LEFT = 1,
		MOUSE_RIGHT = 3;
	var x = e.clientX - canvas.offsetLeft,
		y = e.clientY - canvas.offsetTop;
		
	var modelCoordinates = viewToModel(x, y);

	//If left click, then open block.  If right click, then flag block
	switch(e.which) {
		case MOUSE_LEFT:
			openBlock(modelCoordinates.x, modelCoordinates.y);
			break;
		case MOUSE_RIGHT:
			flagBlock(modelCoordinates.x, modelCoordinates.y);			
	}
	render();
	return false;
});

//Adds action listener
canvas.addEventListener('contextmenu', function(e) {
	e.preventDefault();
	return false;
}, false);
