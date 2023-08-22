class Road {
    constructor(x, width, laneCount=3) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left=x-width/2;
        this.right=x+width/2;

        // create a long line
        const infinity = 1000000;
        this.top = 0;
        this.bottom = infinity;
    }

    getLaneCenter(laneIndex) {
        const laneWidth = this.width/this.laneCount;
        return this.left + laneWidth/2 + laneIndex*laneWidth;
    }

    draw(ctx) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";
        
        for (let i=0; i<=this.laneCount; i++) {
            // lerp function in the utils.js
            const x=lerp(
                this.left,
                this.right,
                i / this.laneCount
            );

            // draw vertical line
            ctx.beginPath();
            if(i>0&&i<this.laneCount){
                ctx.setLineDash([20, 20]);
            } else {
                ctx.setLineDash([20, 5]);
            }
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }
    }
}
