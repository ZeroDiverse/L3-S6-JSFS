import Mobile from './Mobile'
import {SAUCER_HEIGHT, SAUCER_WIDTH, LifeState, ShootState} from './Source'
import SAUCER_IMG_SOURCE from '../assets/images/flyingSaucer-petit.png'
import SAUCER_DESTROYED_IMG_SOURCE from '../assets/images/flyingSaucer-petit_destroyed.png'
import {HEIGHT} from './main.js'

/**
 * Saucer class inherit from mobile - This class represent the enemy of the game
 */
export default class Saucer extends Mobile {
    constructor(x, y) {
        super(x, y, -3, 0)
        //Init the img of the saucer
        this.img = this.init_img(SAUCER_IMG_SOURCE, SAUCER_HEIGHT, SAUCER_WIDTH);
        //Init status of shooted to NONE at the beginning
        this.shooted = ShootState.NONE;
    }

    /**
     * Recalculate the position x and y of the saucer, and set active status to false if it's out of canvas
     */
    move() {
        //If the position of saucer is out of canvas
        if (this.x < 0 || this.y > HEIGHT) {
            //Deactivate the saucer
            this.active = LifeState.DISACTIVE;
        }
        //Or else move
        super.move();
    }

    /**
     * Action fall of the saucer - Stop moving in x and start moving in y direction
     * The saucer is falling down
     */
    fall() {
        this.deltaX = 0;
        this.deltaY = 3;
        this.img = this.init_img(SAUCER_DESTROYED_IMG_SOURCE, SAUCER_HEIGHT, SAUCER_WIDTH);
    }
}
