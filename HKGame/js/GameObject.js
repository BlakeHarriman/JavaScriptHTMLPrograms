class GameObject
{
    constructor (context, x, y, vx, vy, mass){
        this.context = context;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.mass = mass;

        this.isColliding = false;
        this.slowed = false;
        this.slowBound = Math.floor(Math.random() * 75) + 50;
        this.stopped = false;
    }
}