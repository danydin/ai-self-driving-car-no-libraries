// refernce the canvas
const canvas = document.getElementById('myCanvas');
// set the canvas height to screen hegiht
// set the cavnas width to 200px
canvas.width = 200;
// reference to cavnas 2d
const context = canvas.getContext('2d');
// creat a car object with x,y and its dimension
const car = new Car(100,100,30,50);


animate();

function animate() {
    car.updateCarController();
    canvas.height = window.innerHeight;
    car.draw(context);
    // loop what's in the parameter
    requestAnimationFrame(animate)
}
