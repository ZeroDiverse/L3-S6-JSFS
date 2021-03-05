import { alea, DEFINE, alea_delta } from './Define'
import Ball from './Ball'

export default class Animation {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.balls = [];
        this.STOP = true;
    }

    moveAndDraw() {
        this.balls.forEach((e) => {
            if (!this.STOP)
                e.move();
            e.draw();
        });
    }

    addBall() {
        var x = alea(this.canvas.width - DEFINE.SIZE);
        var y = alea(this.canvas.height - DEFINE.SIZE);
        var [deltaX, deltaY] = alea_delta(5);
        this.balls.push(new Ball(this.canvas, this.context, x, y, deltaX, deltaY));
    }

    stop() {
        this.STOP = true;
    }

    start() {
        this.STOP = false;
    }
}