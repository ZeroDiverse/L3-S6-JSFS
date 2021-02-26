import Mobile from './Mobile'
import {BULLET_HEIGHT, BULLET_WIDTH} from './Source'
import BULLET_IMG_SOURCE from '../assets/images/tir.png'
import {WIDTH} from './main.js'

/**
 * Shoot class inherit from mobile - This class represent the bullet from the starship
 */
export default class Shoot extends Mobile {
    constructor(x, y) {
        super(x, y, 8, 0);
        this.img = this.init_img(BULLET_IMG_SOURCE, BULLET_HEIGHT, BULLET_WIDTH);
    }

    /**
     * Move the shoot and if it's out of screen then deactivate it
     */
    move() {
        //If the position x of shoot is out of canvas
        if (this.x > WIDTH)
            //Then deactivate the shoot
            return this.active = false;
        //Else move
        super.move();
    }
}
