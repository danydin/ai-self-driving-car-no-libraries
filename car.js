// create car object
class Car {
// constrctor with parameters of the car
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;
        this.angle = 0;

        // reference to a a control object
        this.controller = new CarController();
    }

    updateCarController() {
        // create another private method to make code cleaner
        this.#move()
    }

    #move() {
        if(this.controller.up) {
            this.speed += this.acceleration;
        }
        if(this.controller.down) {
            this.speed -= this.acceleration;
        }
        if(this.speed>this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if(this.speed<-this.maxSpeed/2){
            this.speed = -this.maxSpeed/2;
        }
        if(this.speed>0){
            this.speed -= this.friction;
        }
        if(this.speed<0) {
            this.speed += this.friction;
        }
        // if not using this formula the car will keep moving in tiny increments indefinitely
        if(Math.abs(this.speed)<this.friction) {
            this.speed = 0;
        }

        if(this.speed!=0){
            const flip = this.speed>0?1:-1;
            if(this.controller.left){
                this.angle += 0.03*flip;
                // old method: this.x -= 2;
            }
            if(this.controller.right){
                this.angle -= 0.03*flip;
                // old method: this.x += 2;
            }
        }
        // circle
        this.x -= Math.sin(this.angle)*this.speed;
        this.y -= Math.cos(this.angle)*this.speed;
        // old method: this.y -= this.speed;
    }

    // method to draw the car on canvas
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle)
        ctx.beginPath();
        ctx.rect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );
        ctx.fill();
        ctx.restore();
    }
}