
class Animation {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.balls = [];
        this.STOP = true;
    }

    moveAndDraw() {
        var that = this;
        
        this.balls.forEach(function(e) {
            if(!that.STOP)
                e.move();
            e.draw();   
        });
    }

    addBall() {
        var x = alea(this.canvas.width-DEFINE.SIZE);
        var y = alea(this.canvas.height-DEFINE.SIZE);
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