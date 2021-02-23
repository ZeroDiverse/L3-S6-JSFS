import Mobile from './Mobile'
import {STARSHIP_HEIGHT, STARSHIP_IMG_SOURCE, STARSHIP_WIDTH, MoveState} from './Source'

export default class StarShip extends Mobile {
    constructor(x, y) {
        super(x, y, 0, 8)
        this.img = this.init_img();
        this.shiftY = 8;
        this.moving = MoveState.NONE;
    }

    init_img() {
        const img = new Image();
        img.src = STARSHIP_IMG_SOURCE;
        img.height = STARSHIP_HEIGHT;
        img.width = STARSHIP_WIDTH;

        return img;
    }

    moveUp() {
        this.shiftY = -8;
        this.moving = MoveState.UP;
    }

    moveDown() {
        this.shiftY = +8;
        this.moving = MoveState.DOWN;
    }

    stopMoving() {
        this.moving = MoveState.NONE;
    }

    move(box) {              // déplace sans sortir des limites de *box*
        if (this.moving === MoveState.UP) {
            this.y = Math.max(0, this.y + this.shiftY);
        }
        if (this.moving === MoveState.DOWN) {
            this.y = Math.min(box.width - STARSHIP_WIDTH, this.y + this.shiftY);
        }
    }

    keyDownActionHandler(event) {
        switch (event.key) {
            case "ArrowUp":
            case "Up":
                this.moveUp();
                break;
            case "ArrowDown":
            case "Down":
                this.moveDown();
                break;
            default: return;
        }
        event.preventDefault();
    }

    keyUpActionHandler(event) {
        switch (event.key) {
            case "ArrowUp":
            case "Up":
            case "ArrowDown":
            case "Down":
                this.stopMoving();
                break;
            default: return;
        }
        event.preventDefault();
    }

}
