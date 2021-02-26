import Game from './Game'
import {STARSHIP_POSITION_X, STARSHIP_WIDTH} from './Source';
import StarShip from './Starship'

//Get the canvas and context
const canvas = document.getElementById("stars");
const context = canvas.getContext("2d");

//Init the starship
const starship = new StarShip(STARSHIP_POSITION_X, canvas.height / 2 - STARSHIP_WIDTH / 2)

//Init the game
const theGame = new Game(canvas, canvas.width, canvas.height, starship)

//Get the score text in html
const scoreText = document.getElementById('score')

//Get add one saucer button in html
const oneSaucerButton = document.getElementById('nouvelleSoucoupe')

//Add the click event listener to the one saucer button
oneSaucerButton.addEventListener("click", createOneSaucer);

//Get add saucers loop button in html
const flotteSoucoupes = document.getElementById('flotteSoucoupes')

//Add the click event listener to the add saucers loop button
flotteSoucoupes.addEventListener('click', createSaucers)

export const WIDTH = canvas.width;
export const HEIGHT = canvas.height;

let soucoupeInterval = null

/**
 * Create new saucer
 */
function createOneSaucer() {
    theGame.addSaucer()
    canvas.focus()
}

/**
 * Create new saucer automatically after 750s
 */
function createSaucers(){
    soucoupeInterval = setInterval(() => {
        theGame.addSaucer()
    }, 750)
    //Focus to the canvas
    canvas.focus()
}

function update() {

    context.clearRect(0, 0, canvas.width, canvas.height);

    theGame.update()

    const raf = window.requestAnimationFrame(update);

    //Update the score on update animation frame
    scoreText.innerHTML = theGame.score
}

// mise en place de l'action des clics sur les boutons + les gestionnaires du clavier pour contrôler le starship
const init = () => {

    window.addEventListener('keydown', theGame.starship.keyDownActionHandler.bind(theGame.starship));
    window.addEventListener('keyup', theGame.starship.keyUpActionHandler.bind(theGame.starship));
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
