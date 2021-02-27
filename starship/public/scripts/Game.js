import Saucer from './Saucer'
import Shoot from './Shoot'
import { LifeState, ShootState } from './Source';

/**
 * Class game
 */
export default class Game {

    //Constructor
    constructor(canvas, width, height, starship) {
        this.canvas = canvas
        this.context = this.canvas.getContext("2d");
        //Width of the game - canvas
        this.width = width
        //Height of the game - canvas
        this.height = height
        //Starship - player
        this.starship = starship
        //Init saucers with empty array
        this.saucers = []
        //Init shoots with empty array
        this.shoots = []
        //Score beginning is equal to 0
        this.score = 0
    }

    /**
     * Add new saucer to the game
     */
    addSaucer() {
        //Create a new saucer instance
        const newSaucer = new Saucer(this.canvas.width - 100, Math.random() * this.canvas.height / 2)
        //Push the new saucer to saucers in the game
        this.saucers.push(newSaucer)
    }

    /**
     * Add shoot to the game
     */
    addShoot() {
        //Create new shoot instance
        const newShoot = new Shoot(this.starship.x + 20, this.starship.y + 32)
        //Add the new shoot to shoot array for tracking
        this.shoots.push(newShoot)
    }

    /**
     * Update position of the starship, shoots and saucers
     */
    update() {
        let that = this;
        //Update the starship position
        this.starship.move(this.canvas);
        this.starship.draw(this.context);

        //For each saucers
        this.saucers.forEach(saucer => {
            //If saucer is active
            if (saucer.active === LifeState.ACTIVE) {
                //If saucer position x < 0
                if (saucer.x < 0) {
                    //Then the score minus 1000
                    this.score -= 1000;
                }
                //For each shoots
                this.shoots.forEach(shoot => {
                    //Check the shoot collision with saucer
                    if (shoot.collisionWith(saucer)) {
                        //Saucer fall
                        saucer.fall();
                        //If saucer is not shooted
                        if (saucer.shooted === ShootState.NONE) {
                            //Increase the score
                            this.score += 200;
                            //Change saucer's shooted status to true
                            saucer.shooted = ShootState.SHOOTED;
                            //bullet hits the saucer and explosion
                            shoot.active = LifeState.DISACTIVE;
                        }
                    }
                });
            }
        });

        //Filter all the active saucers
        this.saucers = this.saucers.filter(element => element.active === LifeState.ACTIVE);

        //For each active saucer, update the status
        this.saucers.forEach((element) => {
            element.update(that.context);
        });

        //Filter all the active shoots
        this.shoots = this.shoots.filter(element => element.active === LifeState.ACTIVE);

        //For each active shoot, update the status
        this.shoots.forEach((element) => {
            element.update(that.context);
        });
    }

}
