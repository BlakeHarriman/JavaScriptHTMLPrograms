/*var update = function() {
	if (pacman.x + 62 <= 0 || pacman.x + 82 >= 1600) {
		pacman.velocityX = pacman.velocityX * -1
	}

	if (pacman.y + 45 >= 900) {
		pacman.velocityX = 0
		pacman.velocityY = 0
	}
}*/

function updateGame() {
	maze.clear();
	//update();
	checkCollision()
	touching = 0;
	for (var i = 0; i < players.length; i++) {
		if (players[i].x + 35 >= players[i].boundXRight || players[i].x <= players[i].boundXLeft) {
			players[i].velocityX = players[i].velocityX * -1
			players[i].velocityY = 0
		}
	
		if (players[i].y + 7 >= 900) {
			players[i].velocityX = 0
			players[i].velocityY = 0
		}

		if (players[i].y + 7 >= players[i].slowBound && !players[i].slowed) {
			var tmp = Math.floor(Math.random() * 8) - 4
			while (tmp == 0) {
				tmp = Math.floor(Math.random() * 8) - 4
			}
			players[i].velocityX = tmp
			players[i].velocityY = -0.5
			players[i].slowed = true
			console.log("Player position: " + players[i].y)
		}
		players[i].newPos()
		players[i].update()
	}
	//pacman.newPos();
	//pacman.update();
}

function checkCollision() {

	for (let i = 0; i < players.length; i++) {
        players[i].isColliding = false;
    }

    for (let i = 0; i < players.length; i++) {
        obj1 = players[i];
        for (let j = i + 1; j < players.length; j++) {
            obj2 = players[j];

            // Compare object1 with object2
            if (rectIntersect(obj1.x, obj1.y, obj1.width, obj1.height, obj2.x, obj2.y, obj2.width, obj2.height)) {
                obj1.isColliding = true;
                obj2.isColliding = true;
            }
        }
    }
}

function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    // Check x and y for overlap
    if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2){
        return false;
    }
    return true;
}

updateGame();
setInterval(updateGame, 10);
//render();
log = 1;
//setInterval(render, 1000/15);
