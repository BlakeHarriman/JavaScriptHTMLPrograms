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
	touching = 0;
	for (var i = 0; i < players.length; i++) {
		if (players[i].x + 35 >= players[i].boundXRight || players[i].x <= players[i].boundXLeft) {
			players[i].velocityX = players[i].velocityX * -1
		}
	
		if (players[i].y + 7 >= 900) {
			players[i].velocityX = 0
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

updateGame();
setInterval(updateGame, 10);
//render();
log = 1;
//setInterval(render, 1000/15);
