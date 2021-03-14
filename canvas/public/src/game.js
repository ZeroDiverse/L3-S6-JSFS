import AnimationWithObstacle from './AnimationWithObstacle'
import Obstacle from './Obstacle'

const myCanvas = document.getElementById("terrain");
const context = myCanvas.getContext("2d");

let animation = null;

const init = () => {
    animation = new AnimationWithObstacle(myCanvas, context, new Obstacle(100,200,10,200));
    
    window.addEventListener('keydown', animation.keyDownActionHandler.bind(animation));
    window.addEventListener('keyup', animation.keyUpActionHandler.bind(animation));
    
    update();
}

const update = () => {
    
    context.clearRect(0,0,myCanvas.width,myCanvas.height);

    animation.moveAndDraw();
    const raf = window.requestAnimationFrame(update);
}

const animationButton = () => {
    if(buttonStopStartBall.innerText == "Start") {
        buttonStopStartBall.innerText = "Stop";
        animation.start();
    } else {
        buttonStopStartBall.innerText = "Start";
        animation.stop();
    }
    
}

const buttonStopStartBall = document.getElementById("stopStartBall");

buttonStopStartBall.addEventListener("click", animationButton);

const buttonAddBall = document.getElementById("addBall");

const addBall = () => {
    animation.addBall();
}

buttonAddBall.addEventListener('click', addBall)

window.addEventListener("load", init);

//Bundle generated
console.log('le bundle a été généré');