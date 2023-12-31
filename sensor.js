class Sensor{
    constructor(car) {
        this.car = car;

        this.raysCount = 5;
        this.rayLength = 150; // pixels
        this.rayAngle = Math.PI/2; // changing this will change the angels of the rays, e.g. * 4 will ray 360 angles, while /2 wil be 90 degree angle
        this.rays = [];
        this.readings = []; 
    }

    update(roadBorders, traffic) {
        this.#castRays();
        this.readings = []; 
        for(let i=0; i<this.rays.length; i++) {
            this.readings.push
            (
                this.#detectors
                (
                    this.rays[i],
                    roadBorders,
                    traffic
                )
            );
        }
    }

    #detectors(ray, roadBorders, traffic) {
         let touches = [];
         for (let i=0 ; i<roadBorders.length ; i++) {
            const touch = getIntersection(
                ray[0],
                ray[1],
                roadBorders[i][0],
                roadBorders[i][1]
            );
            if (touch){
                touches.push(touch);
            }
        }

        for(let i=0; i<traffic.length; i++){
            const carShape = traffic[i].carStrcture;
            for(let j=0; j<carShape.length; j++){
                const value = getIntersection(
                    ray[0],
                    ray[1],
                    carShape[j],
                    carShape[(j+1)%carShape.length] 
                )
                if(value){
                    touches.push(value);
                }
            }
        }
        
        if(touches.length==0){
            return null;
        } else {
            const offsets = touches.map(e=>e.offset);
            const minOffset = Math.min(...offsets) // Math.min doesn't accept an array which .map generates so we use the spread operator which convert the array to singel seperated values in a comma separated string
            return touches.find(e=>e.offset==minOffset);
        }
    
    }

    #castRays() {
        this.rays = [];
        for(let i=0; i<this.raysCount; i++) {
            const rayPosition = this.car.angle + lerp // this.car.angle makes the sensors to move w/car angle
            (
                this.rayAngle/2, // half of an angle
                -this.rayAngle/2, // other half of an angle
                this.raysCount == 1 ? 0.5 : i / (this.raysCount-1) // calculate an intermediate value between 0 and 1 based on the amount rays (-1 becuase we loop by i < this.raysAmount) if only 1 ray it cant divide by 0 so we default to 1
            );
            const rayStart = {x: this.car.x, y: this.car.y};
            const rayEnd = {
                x: this.car.x - Math.sin(rayPosition) * this.rayLength,
                y: this.car.y - Math.cos(rayPosition) * this.rayLength
            }
            this.rays.push([rayStart, rayEnd]);
        }
    }


    draw(context) {
        for(let i=0; i<this.raysCount; i++){
            let endBorder = this.rays[i][1];
            if(this.readings[i]){
                endBorder = this.readings[i];
            }

            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = "yellow";
            context.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
                );
            context.lineTo(
                endBorder.x,
                endBorder.y
                );
            context.stroke();


            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = "black";
            context.moveTo(
                this.rays[i][1].x,
                this.rays[i][1].y
                );
            context.lineTo(
                endBorder.x,
                endBorder.y
                );
            context.stroke();
        }
    }
}