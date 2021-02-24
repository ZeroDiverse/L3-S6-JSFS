import Mobile from './Mobile'
import {BULLET_HEIGHT, BULLET_WIDTH} from './Source'
import BULLET_IMG_SOURCE from '../assets/images/tir.png'

export default class Shoot extends Mobile {
    constructor(x, y) {
        super(x, y, 8, 0);
        this.img = this.init_img(BULLET_IMG_SOURCE, BULLET_HEIGHT, BULLET_WIDTH);
    }

    move() {
        if (this.x < 0)
            this.active = false;
        super.move();
    }

    collisionWith(saucer) {
        let x1 = this.x, y1 = this.y;
        let x2 = this.x + BULLET_WIDTH, y2 = this.y + BULLET_HEIGHT;
        let px = saucer.x, py = saucer.y;
        let px1 = saucer.x + saucer.img.width, py1 = saucer.y + saucer.img.height;

        let kx = Math.max(x1, px), ky = Math.max(y1, py);
        let kx1 = Math.min(x2, px1), ky1 = Math.min(y2, py1);

        if (kx <= kx1 && ky <= ky1){
            this.active = false
            return true;
        }
        return false;
    }
}
