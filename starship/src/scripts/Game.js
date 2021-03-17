import Saucer from './Saucer'
import Shoot from './Shoot'
import Explosion from './Explosion'
import {LifeState, ShootState} from './Source';

/**
 * Class game
 */
export default class Game {

    //Constructor
    constructor(canvas, width, height, starship, life) {
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
        this.explosions = []
        //Init explosions with empty array
        this.shoots = []
        //Score beginning is equal to 0
        this.score = 0
        //Number of life left
        this.lifeLeft = life
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
     * Add explosion to the game
     */
    addExplosion(x, y) {
        //Create new Explosion instance
        const newExplosion = new Explosion(x, y)
        //Add the new explosion to explosions array for tracking
        this.explosions.push(newExplosion)
    }

    /**
     * Update position of the starship, shoots and saucers
     */
    update() {
        //Update the starship position
        this.starship.move(this.canvas);
        this.starship.draw(this.context);

        this.updateActionForShootAndSaucer()

        //Filter all the active saucers
        this.saucers = this.saucers.filter(element => element.active === LifeState.ACTIVE);

        //For each active saucer, update the status
        this.saucers.forEach((element) => {
            element.update(this.context);
        });

        //Filter all the active shoots
        this.shoots = this.shoots.filter(element => element.active === LifeState.ACTIVE);

        //For each active shoot, update the status
        this.shoots.forEach((element) => {
            element.update(this.context);
        });

        //Filter all the active shoots
        this.explosions = this.explosions.filter(element => element.active === LifeState.ACTIVE);

        //For each active shoot, update the status
        this.explosions.forEach((element) => {
            element.update(this.context);
        });
    }

    /**
     * This method controls the action of saucer when they passed the line
     * @param saucer
     */
    actionWhenSaucerPassedTheLine(saucer) {
        //If saucer position x < 0
        if (saucer.x < 0) {
            //Then the score > 1000 then minus 1000
            if (this.score > 1000) {
                this.score -= 1000
            } else {
                this.score = 0;
            }
            //If life > 0 then decrease life by 1
            if (this.lifeLeft > 0) {
                this.lifeLeft -= 1
            }
        }
    }

    /**
     * check if shoot collied with saucers and action
     * @param shoot
     * @param saucer
     */
    checkWhenShootCollidedWithSaucer(shoot, saucer) {
        //Check the shoot collision with saucer
        if (shoot.collisionWith(saucer)) {
            //Saucer fall
            saucer.fall();
            //If saucer is not shooted
            if (!saucer.shooted) {
                this.addExplosion(saucer.x, saucer.y)
                this.addExplosion(saucer.x, saucer.y)
                shoot.active = false
                //Increase the score
                this.score += 200;
                //Change saucer's shooted status to true
                saucer.shooted = ShootState.SHOOTED;
                //bullet hits the saucer and explosion
                shoot.active = LifeState.DISACTIVE;
            }
        }
    }

    /**
     * This function update checking to update the status of saucers and shoots
     */
    updateActionForShootAndSaucer() {
        //For each saucers
        this.saucers.forEach(saucer => {
            //If saucer is active
            if (saucer.active === LifeState.ACTIVE) {
                this.actionWhenSaucerPassedTheLine(saucer)
                //For each shoots
                this.shoots.forEach(shoot => {
                    this.checkWhenShootCollidedWithSaucer(shoot, saucer)                    
                });
            }
        });
    }

    keyDownActionHandler(event) {
        switch (event.key) {
            case "ArrowUp":
            case "Up":
                this.starship.moveUp();
                break;
            case "ArrowDown":
            case "Down":
                this.starship.moveDown();
                break;
            default:
                return;
        }
        event.preventDefault();
    }

    keyUpActionHandler(event) {
        switch (event.key) {
            case "ArrowUp":
            case "Up":
            case "ArrowDown":
            case "Down":
                this.starship.stopMoving();
                break;
            default:
                return;
        }
        event.preventDefault();
    }
}
