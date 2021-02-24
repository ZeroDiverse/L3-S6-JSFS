import Game from './Game'
import {STARSHIP_POSITION_X, STARSHIP_WIDTH} from './Source';
import StarShip from './Starship'

const canvas = document.getElementById("stars");
const context = canvas.getContext("2d");

const starship = new StarShip(STARSHIP_POSITION_X, canvas.height / 2 - STARSHIP_WIDTH / 2)

const theGame = new Game(canvas, canvas.width, canvas.height, starship)

const scoreText = document.getElementById('score')

const oneSaucerButton = document.getElementById('nouvelleSoucoupe')

oneSaucerButton.addEventListener("click", createOneSaucer);

const flotteSoucoupes = document.getElementById('flotteSoucoupes')

flotteSoucoupes.addEventListener('click', createSaucers)

let soucoupeInterval = null

function createOneSaucer() {
    theGame.addSaucer()
    canvas.focus()
}

function createSaucers(){
    soucoupeInterval = setInterval(() => {
        theGame.addSaucer()
    }, 750)
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

//
console.log('le bundle a été généré');
