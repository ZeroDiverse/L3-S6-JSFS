import {MoveState} from './Define'

export default class Obstacle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.shiftX = -10;
    }

    draw(context) {
        context.fillStyle = "rgb(0,0,0)";
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    moveLeft() {
        this.shiftX = - 10;
        this.moving = MoveState.LEFT;
    }

    moveRight() {
        this.shiftX = + 10;
        this.moving = MoveState.RIGHT;
    }

    stopMoving() {
        this.moving = MoveState.NONE;
    }

    move(box) {              // déplace sans sortir des limites de *box*
        if (this.moving === MoveState.LEFT) {
            this.x = Math.max(0, this.x + this.shiftX);
        }
        if (this.moving === MoveState.RIGHT) {
            this.x = Math.min(box.width - this.width, this.x + this.shiftX);
        }
    }
}