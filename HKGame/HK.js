var players = []
counter = 0


var maze = {
	canvas : document.createElement("canvas"),
	start : function() {
		this.canvas.width = 1600;
		this.canvas.height = 900;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
	},
	
	clear: function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

function component(width, height, color, x, y) {
	this.width = width;
	this.height = height;
	this.color = color;
	this.x = x;
	this.y = y;
	//this.velocityX = Math.floor(Math.random() * 4) + 1;
	this.velocityX = 0;
	this.velocityY = -3;
	this.angle = 0;
	this.direction = 0;
	this.boundXRight = 1600 - x;
	this.boundXLeft = -x;
	this.slowed = false;
	this.slowBound = Math.floor(Math.random() * 300) + 50
	this.isColliding = false
	this.update = function() {
        ctx = maze.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = color;
		ctx.strokeStyle = 'yellow';
		ctx.fillStyle = 'yellow';
		if (this.isColliding) {
			ctx.fillStyle = "red"
		}
		ctx.fillRect(x, y, this.width, this.height);
        ctx.restore();    
    }
	this.newPos = function() {
		this.x += this.velocityX * Math.cos(this.angle);
		this.y -= this.velocityY * Math.cos(this.angle);
    }
}

	//ctx.fillRect(pacman.x - 25, pacman.y - 25, 2, 2); //top left
	//ctx.fillRect(pacman.x - 12, pacman.y - 25, 2, 2); //top right
	//ctx.fillRect(pacman.x - 12, pacman.y - 12, 2, 2); //bottom right
	//ctx.fillRect(pacman.x - 25, pacman.y - 12, 2, 2); //bottom left

function addPlayer() {
	tmp = new component (35, 35, "yellow", Math.floor(Math.random() * 700), -30);
	players.push(tmp)
}



function init() {
	addPlayer()
	addPlayer()
	/*addPlayer()
	addPlayer()
	setTimeout(function() {
		addPlayer()
	}, 500)
	setTimeout(function() {
		addPlayer()
	}, 1000)
	setTimeout(function() {
		addPlayer()
	}, 1500)*/
	//pacman = new component (35, 35, "yellow", 60, 10);
	maze.start();
}

init();
