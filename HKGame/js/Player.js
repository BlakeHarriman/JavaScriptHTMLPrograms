class Player extends GameObject {
    constructor (context, x, y, vx, vy, mass) {
        super(context, x, y, vx, vy, mass);

        //Set default width and height
        this.width = 50;
        this.height = 50;
    }

    draw(){
        //Draw hitbox for the player
        this.context.fillStyle = this.isColliding?'#ff8080':'#0099b0';
        if (this.stopped) {
            this.context.fillStyle = "orange";
        }
        this.context.fillRect(this.x, this.y, this.width, this.height);
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