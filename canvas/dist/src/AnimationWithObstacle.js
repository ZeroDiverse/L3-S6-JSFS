import Animation from './Animation'

export default class AnimationWithObstacle extends Animation {
    constructor(canvas, context, obstacle) {
        super(canvas, context);
        this.obstacle = obstacle;
    }

    moveAndDraw() {
        this.balls = this.balls.filter((e) => !e.collisionWith(this.obstacle));

        this.balls.forEach((e) => {
            if (!this.STOP)
                e.move();
            e.draw();
        });

        this.obstacle.move(this.canvas);
        this.obstacle.draw(this.context);
    }

    keyDownActionHandler(event) {
        switch (event.key) {
            case "ArrowLeft":
            case "Left":
                this.obstacle.moveLeft();
                break;
            case "ArrowRight":
            case "Right":
                this.obstacle.moveRight();
                break;
            default: return;
        }
        event.preventDefault();
    }

    keyUpActionHandler(event) {
        switch (event.key) {
            case "ArrowLeft":
            case "Left":
            case "ArrowRight":
            case "Right":
                this.obstacle.stopMoving();
                break;
            default: return;
        }
        event.preventDefault();
    }
}