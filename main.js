// refernce the canvas
const canvas = document.getElementById('myCanvas');
// set the canvas height to screen hegiht
// set the cavnas width to 200px
canvas.width = 200;
// reference to cavnas 2d
const context = canvas.getContext('2d');
const road = new Road(canvas.width/2, canvas.width*0.9)
// creat a car object with x,y and its dimension
const car = new Car(road.getLaneCenter(1),100,30,50);


animate();

function animate() {
    car.updateCarController();
    canvas.height = window.innerHeight;
    road.draw(context);
    car.draw(context);
    // loop what's in the parameter
    requestAnimationFrame(animate)
}
