import Mobile from './Mobile'
import {SAUCER_HEIGHT, SAUCER_WIDTH} from './Source'
import SAUCER_IMG_SOURCE from '../assets/images/flyingSaucer-petit.png'
import {HEIGHT} from './main.js'

export default class Saucer extends Mobile {
    constructor(x, y) {
        super(x, y, -3, 0)
        this.img = this.init_img();
        this.shooted = false;
    }

    init_img() {
        const img = new Image();
        img.src = SAUCER_IMG_SOURCE;
        img.height = SAUCER_HEIGHT;
        img.width = SAUCER_WIDTH;
        return img;
    }

    draw(context) {
        context.drawImage(this.img, this.x, this.y);
    }

    move() {
        if (this.x < 0 || this.y > HEIGHT){
            this.active = false;
        }
        super.move();
    }

    fall() {
        this.shooted = true;
        this.deltaX = 0;
        this.deltaY = 3;
    }
}
