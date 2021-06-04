class GameObject
{
    constructor (context, x, y, vx, vy, mass, charName, userName){
        this.context = context;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.mass = mass;
        this.charName = charName
        this.userName = userName

        this.isColliding = false;
        this.slowed = false;
        this.slowBound = Math.floor(Math.random() * 200) + 50;
        this.stopped = false;
        this.won = false;
    }
}