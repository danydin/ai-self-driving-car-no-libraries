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

        // reference to a a control object
        this.controller = new CarController();
    }

    updateCarController() {
        if(this.controller.up) {
            this.speed += this.acceleration;
            // console.log(this.y);
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
        if(Math.abs(this.speed)<this.friction) {
            this.speed = 0;
        }
        if(this.controller.left){
            this.x -= 2;
        }
        if(this.controller.right){
            this.
        }
        this.y -= this.speed;
    }

    // method to draw the car on canvas
    draw(ctx) {
        ctx.beginPath();
        ctx.rect(
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        );
        ctx.fill();
    }
}