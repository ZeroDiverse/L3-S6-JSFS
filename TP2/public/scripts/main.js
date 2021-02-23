import Game from './Game'
import { STARSHIP_POSITION_X, STARSHIP_WIDTH } from './Source';
import StarShip from './Starship'

const canvas = document.getElementById("stars");
const context = canvas.getContext("2d");

const starship = new StarShip(STARSHIP_POSITION_X, canvas.height / 2 - STARSHIP_WIDTH / 2)

const theGame = new Game(canvas, canvas.width, canvas.height, starship)

const oneSaucerButton = document.getElementById('nouvelleSoucoupe')

oneSaucerButton.addEventListener("click", createOneSaucer);

function createOneSaucer() {
    theGame.addSaucer()
}

function update() {

    context.clearRect(0, 0, canvas.width, canvas.height);

    theGame.update()

    const raf = window.requestAnimationFrame(update);
}

// mise en place de l'action des clics sur les boutons + les gestionnaires du clavier pour contrôler le starship
const init = () => {

    window.addEventListener('keydown', theGame.starship.keyDownActionHandler.bind(theGame.starship));
    window.addEventListener('keyup', theGame.starship.keyUpActionHandler.bind(theGame.starship));

    update();
}

window.addEventListener("load", init);

//
console.log('le bundle a été généré');
