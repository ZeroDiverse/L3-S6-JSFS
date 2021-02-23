import Mobile from './Mobile'
import {SAUCER_HEIGHT, SAUCER_IMG_SOURCE, SAUCER_WIDTH} from './Source'

export default class Saucer extends Mobile {
    constructor(x, y) {
        super(x, y, -3, 0)
        this.img = this.init_img();
    }

    init_img() {
        const img = new Image();
        img.src = SAUCER_IMG_SOURCE;
        img.height = SAUCER_HEIGHT;
        img.width = SAUCER_WIDTH;
        return img;
    }

    draw(context){
        context.drawImage(this.img, this.x, this.y); 
    }

    move() {
        if(this.x < 0)
            this.active = false;
        super.move();
    }
}