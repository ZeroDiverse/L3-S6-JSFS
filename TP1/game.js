
const myCanvas = document.getElementById("terrain");
const context = myCanvas.getContext("2d");

var raf = null;
var animation = null;

function init() {
    animation = new AnimationWithObstacle(myCanvas, context, new Obstacle(100,200,10,200));
    
    window.addEventListener('keydown', animation.keyDownActionHandler.bind(animation));
    window.addEventListener('keyup', animation.keyUpActionHandler.bind(animation));
    
    update();
}

function update() {
    
    context.clearRect(0,0,myCanvas.width,myCanvas.height);

    animation.moveAndDraw();
    const raf = window.requestAnimationFrame(update);
}

function animationButton() {
    button = document.getElementById("stopStartBall");
    if(button.innerText == "Start") {
        button.innerText = "Stop";
        animation.start();
    } else {
        button.innerText = "Start";
        animation.stop();
    }
    
}

function addBall() {
    animation.addBall();
}

init();