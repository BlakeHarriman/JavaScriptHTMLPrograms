class Player extends GameObject {
    constructor (context, x, y, vx, vy, mass, charName, userName) {
        super(context, x, y, vx, vy, mass, charName, userName);

        //Set default width and height
        this.width = 50;
        this.height = 50;
    }

    draw(){
        //Draw hitbox for the player
        this.context.fillStyle = this.isColliding?'#ff8080':'#0099b0';
        this.context.font = "25px Arial";
        var img = document.getElementById(this.charName.toString())
        if (!this.stopped) {
            this.context.drawImage(img, this.x - 7.5, this.y - 7.5, this.width + 15, this.height + 15);
        } else if (this.stopped && (this.x + this.width / 2 < 700 || this.x + this.width / 2 > 900)) {
            this.context.globalAlpha = 0.1;
            this.context.fillStyle = 'rgb(' + 255 + ',' + 165 + ',' + 0 + ',' + 0.1 + ')';
            this.context.drawImage(img, this.x - 7.5, this.y - 7.5, this.width + 15, this.height + 15);
            this.context.globalAlpha = 1;
        } else if (this.stopped && this.x + this.width / 2 > 700 && this.x + this.width / 2 < 900) {
            this.context.fillStyle = 'rgb(' + 0 + ',' + 255 + ',' + 0 + ',' + 0.1 + ')';
            if (this.won) {
                var score = (100 - Math.abs(this.x + this.width / 2 - 800)).toFixed(2)
                this.context.font = "25px Arial";
                this.context.fillStyle = "purple";
                this.context.fillText(score.toString(), this.x - 5, this.y - 35)
            } else {
                this.context.globalAlpha = 0.1;
            }
            this.context.drawImage(img, this.x - 7.5, this.y - 7.5, this.width + 15, this.height + 15);
            this.context.globalAlpha = 1;
        }
        //this.context.fillRect(this.x, this.y, this.width, this.height);
        var textXCoord = this.x + 18 - 4.8 * this.userName.length
        this.context.fillText(this.userName, textXCoord, this.y - 12)
    }

    update(secondsPassed){
        //Move with set velocity
        if (!this.stopped) {
            this.vy += 60 * secondsPassed;
        }
        if (this.vy > 30 && this.y >= this.slowBound) {
            this.vy = 30
        }
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;
    }
}