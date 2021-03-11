import Game from './Game'
import {STARSHIP_POSITION_X, STARSHIP_WIDTH} from './Source';
import StarShip from './Starship'
import { io } from "socket.io-client";

const socket = io();

//Get the canvas and context
const canvas = document.querySelector("#stars");
const context = canvas.getContext("2d");

//Init the starship
const starship = new StarShip(STARSHIP_POSITION_X, canvas.height / 2 - STARSHIP_WIDTH / 2)

//Init the game
const theGame = new Game(canvas, canvas.width, canvas.height, starship, 5)

//Get the score text in html
const scoreText = document.querySelector('#score')

//Get the life left in html
const lifeLeftText = document.querySelector("#lifeLeftText")
const lifeLeft = document.querySelector("#lifeLeft")

export const WIDTH = canvas.width;
export const HEIGHT = canvas.height;

let soucoupeInterval = null

/**
 * Create new saucer automatically after 750s
 */
const createSaucers = () => {
    soucoupeInterval = setInterval(() => {
        theGame.addSaucer()
    }, 750)
    //Focus to the canvas
    canvas.focus()
}

/**
 * Create new saucer
 */
const createOneSaucer = () => {
    theGame.addSaucer()
    canvas.focus()
}

//Get add one saucer button in html
const oneSaucerButton = document.querySelector('#nouvelleSoucoupe')

//Add the click event listener to the one saucer button
oneSaucerButton.addEventListener("click", createOneSaucer);

//Get add saucers loop button in html
const flotteSoucoupes = document.querySelector('#flotteSoucoupes')

//Add the click event listener to the add saucers loop button
flotteSoucoupes.addEventListener('click', createSaucers)

const update = () => {

    if (theGame.lifeLeft > 0) {
        lifeLeft.innerHTML = theGame.lifeLeft
    } else {
        lifeLeftText.innerHTML = `Game over. Your score is ${theGame.score}`
        canvas.style.animationName = 'none'
        context.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    theGame.update();

    const raf = window.requestAnimationFrame(update);

    //Update the score on update animation frame
    scoreText.innerHTML = theGame.score
}

// mise en place de l'action des clics sur les boutons + les gestionnaires du clavier pour contrôler le starship
const init = () => {

    window.addEventListener('keydown', theGame.keyDownActionHandler.bind(theGame));
    window.addEventListener('keyup', theGame.keyUpActionHandler.bind(theGame));
    window.addEventListener('keypress', (e) => {
        if (e.code === "Space") {
            theGame.addShoot()
        }
    });

    update();
}

window.addEventListener("load", init);

//Bundle generated
console.log('le bundle a été généré');
