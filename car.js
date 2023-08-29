// create car object
class Car {
// constrctor with parameters of the car
    constructor(x, y, width, height, controlType, maxSpeed = 3) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.maxSpeed = maxSpeed;

        this.speed = 0;
        this.acceleration = 0.2;
        this.friction = 0.05;
        this.angle = 0;
        this.damaged = false;

        this.sensors = new Sensors(this); 
        this.controller = new CarController(controlType);
    }

    update(roadBorders) {
        // call to a private method below to make code cleaner & safer
        if(!this.damaged){
            this.#move()
            this.carStrcture = this.#createCarStrcture();
            this.damaged = this.#assessDamage(roadBorders);
        }
        this.sensors.update(roadBorders);
    }

    #assessDamage(roadBorders) {
        for (let i=0; i<roadBorders.length; i++) {
            if (carIntersect(this.carStrcture, roadBorders[i])){
                return true;
            }
        }
        return false;
    }

    #createCarStrcture(){
        const points = [];
        const rad = Math.hypot(this.width, this.height)/2; // /2 becuase we want half of the size
        const alpha = Math.atan2(this.width, this.height); // alpha is the angle is the same if divide2or not
        points.push({
            x: this.x-Math.sin(this.angle - alpha)*rad,
            y: this.y-Math.cos(this.angle - alpha)*rad
        });
        points.push({
            x: this.x-Math.sin(this.angle + alpha)*rad,
            y: this.y-Math.cos(this.angle + alpha)*rad
        });
        points.push({
            x: this.x-Math.sin(Math.PI + this.angle-alpha)*rad,
            y: this.y-Math.cos(Math.PI + this.angle-alpha)*rad
        });
        points.push({
            x: this.x-Math.sin(Math.PI + this.angle + alpha)*rad,
            y: this.y-Math.cos(Math.PI + this.angle + alpha)*rad
        });
        return points;
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

        this.x -= Math.sin(this.angle)*this.speed;
        this.y -= Math.cos(this.angle)*this.speed;
        // old method: this.y -= this.speed;
    }

    // method to draw the car on canvas
    draw(ctx) {
        if(this.damaged){
            ctx.fillStyle = "gray"; // because we use line with thickness if we go a bit on the line it doesn't change to gray if we want it to change with a line thickness we need to change the border line to a rect instead so we can detect all its segements
        } else {
            ctx.fillStyle = "black";
        }
        ctx.beginPath();
        ctx.moveTo(this.carStrcture[0].x, this.carStrcture[0].y);
        for (let i = 1; i < this.carStrcture.length; i++) {
            ctx.lineTo(this.carStrcture[i].x, this.carStrcture[i].y);
        }
        ctx.fill();
        this.sensors.draw(ctx);
    }
}