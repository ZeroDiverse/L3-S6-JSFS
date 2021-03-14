import {DEFINE} from './Define'

export default class Ball {
    constructor(canvas, context, x, y, deltaX, deltaY) {
        this.canvas = canvas;
        this.context = context;
        this.x = x;
        this.y = y;
        this.deltaX = deltaX;
        this.deltaY = deltaY;
        this.img = this.init_img();
    }

    init_img() {
        var nimg = new Image();
        nimg.src = DEFINE.SRC_IMG;
        nimg.height = DEFINE.SIZE;
        nimg.width = DEFINE.SIZE;

        return nimg;
    }

    draw() {
        this.context.drawImage(this.img, this.x, this.y); 
    }

    move() {
        if(this.x + this.deltaX < 0 || this.x + this.deltaX > this.canvas.width - DEFINE.SIZE)
            this.deltaX = -this.deltaX;
        if(this.y + this.deltaY < 0 || this.y + this.deltaY > this.canvas.height - DEFINE.SIZE)
            this.deltaY = -this.deltaY;

        this.x += this.deltaX;
        this.y += this.deltaY;
    }

    collisionWith(obstacle) {
        let x1 = this.x, y1 = this.y;
        let x2 = this.x + DEFINE.SIZE, y2 = this.y + DEFINE.SIZE;
        let px = obstacle.x, py = obstacle.y;
        let px1 = obstacle.x + obstacle.width, py1 = obstacle.y + obstacle.height;
        
        let kx = Math.max(x1, px), ky = Math.max(y1, py);
        let kx1 = Math.min(x2, px1), ky1 = Math.min(y2, py1);

        if(kx <= kx1 && ky <= ky1)
            return true;
        return false;
    }

}