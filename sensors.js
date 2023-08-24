class Sensors{
    constructor(car) {
        this.car = car;

        this.raysCount = 5;
        this.rayLength = 150; // pixels
        this.rayAngle = Math.PI/2; // changing this will change the angels of the rays, e.g. * 4 will ray 360 angles, while /2 wil be 90 degree angle
        this.rays = [];
    }

    update() {
        this.rays = [];
        for(let i=0; i<this.raysCount; i++) {
            const rayPosition = this.car.angle + lerp // car.angle makes the sensors to move w/car angle
            (
                this.rayAngle/2, // half of an angle
                -this.rayAngle/2, // the other half an angle
                this.raysCount==1?0.5:i/(this.raysCount-1) // calculate an intermediate value between 0 and 1 based on the index i of the current ray and the total number of rays (-1 becuase we loop by i < this.raysAmount)
            );
            const firstRayLoc = {x: this.car.x, y: this.car.y};
            const lastRayLoc = {
                x: this.car.x - Math.sin(rayPosition) * this.rayLength,
                y: this.car.y - Math.cos(rayPosition) * this.rayLength
            }
            this.rays.push([firstRayLoc, lastRayLoc]);
        }
    }

    draw(context) {
        for(let i=0; i<this.raysCount; i++){
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = "yellow";
            context.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
                );
            context.lineTo(
                this.rays[i][1].x,
                this.rays[i][1].y
                );
            context.stroke();
        }
    }
}