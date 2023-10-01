// refernce the canvas
const canvas = document.getElementById('myCanvas');
// set the canvas height to screen hegiht
// set the cavnas width to 200px
canvas.width = 200;
// reference to cavnas 2d
const context = canvas.getContext('2d');
const road = new Road(canvas.width/2, canvas.width*0.9)
// creat a car object with x,y and its dimension
const car = new Car(road.getLaneCenter(1), 100,30,50, "AI");
const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "BOT", maxSpeed = 2)
];


animate();

function animate() {
    for (i=0; i< traffic.length; i++) {
        traffic[i].update(road.borders, []); 
    }
    car.update(road.borders, traffic);
    canvas.height = window.innerHeight;
    context.save();
    // camera/road movement instead of the car
    context.translate(0, -car.y + canvas.height * 0.7)
    road.draw(context);
    for (let i=0; i<traffic.length; i++){
        traffic[i].draw(context, "red");
    }
    car.draw(context, "blue");
    context.restore();
    // loop what's in the parameter
    requestAnimationFrame(animate)
}
