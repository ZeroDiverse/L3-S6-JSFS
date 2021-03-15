import Mobile from './Mobile'
import {STARSHIP_HEIGHT, STARSHIP_WIDTH, MoveState} from './Source'
import STARSHIP_IMG_SOURCE from '../assets/images/vaisseau-ballon-petit.png'

/**
 * Starship class inherit from mobile - This class represent the player of the game
 */
export default class StarShip extends Mobile {
    constructor(x, y) {
        super(x, y, 0, 8)
        this.img = this.init_img(STARSHIP_IMG_SOURCE, STARSHIP_HEIGHT, STARSHIP_WIDTH);
        this.shiftY = 8;
        this.moving = MoveState.NONE;
    }

    /**
     * Starship move up, set the shiftY to negative and change status to up
     */
    moveUp() {
        this.shiftY = -8;
        this.moving = MoveState.UP;
    }

    /**
     * Starship move down, set the shiftY to positive and change status to down
     */
    moveDown() {
        this.shiftY = +8;
        this.moving = MoveState.DOWN;
    }

    /**
     * Starship stop moving, Change move state to none
     */
    stopMoving() {
        this.moving = MoveState.NONE;
    }

    move(box) {              // déplace sans sortir des limites de *box*
        if (this.moving === MoveState.UP) {
            this.y = Math.max(0, this.y + this.shiftY);
        }
        if (this.moving === MoveState.DOWN) {
            this.y = Math.min(box.height - STARSHIP_WIDTH, this.y + this.shiftY);
        }
    }
}
