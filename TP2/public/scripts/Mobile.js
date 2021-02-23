export default class Mobile {

    constructor(x, y, deltaX, deltaY) {
        this.x = x;
        this.y = y;
        this.deltaX = deltaX;
        this.deltaY = deltaY;
        this.img = this.init_img();
        this.active = true;
    }

    init_img() {
        const nimg = new Image();
        nimg.src = DEFINE.SRC_IMG;
        nimg.height = DEFINE.SIZE;
        nimg.width = DEFINE.SIZE;

        return nimg;
    }

    draw(context){
        context.drawImage(this.img, this.x, this.y); 
    }

    move(){
        this.x += this.deltaX;
        this.y += this.deltaY;
    }

    update(context) {
        this.move();
        this.draw(context);
    }

    collisionWith(saucer) {
        let x1 = this.x, y1 = this.y;
        let x2 = this.x + DEFINE.SIZE, y2 = this.y + DEFINE.SIZE;
        let px = saucer.x, py = saucer.y;
        let px1 = saucer.x + saucer.width, py1 = saucer.y + saucer.height;
        
        let kx = Math.max(x1, px), ky = Math.max(y1, py);
        let kx1 = Math.min(x2, px1), ky1 = Math.min(y2, py1);

        if(kx <= kx1 && ky <= ky1)
            return true;
        return false;
    }
}