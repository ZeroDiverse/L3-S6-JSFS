import Game from './Game'
import { STARSHIP_POSITION_X, STARSHIP_WIDTH } from './Source';
import StarShip from './StarShip'

const canvas = document.getElementById("stars");

const starship = new StarShip(STARSHIP_POSITION_X, canvas.height / 2 - STARSHIP_WIDTH / 2, 0, 0)

const theGame = new Game(canvas, canvas.width, canvas.height, starship)

// mise en place de l'action des clics sur les boutons + les gestionnaires du clavier pour contrôler le starship
const init = () => {
    theGame.initStarship()
}

window.addEventListener("load", init);

//
console.log('le bundle a été généré');
