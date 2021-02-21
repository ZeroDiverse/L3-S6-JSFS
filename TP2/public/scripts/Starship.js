import Mobile from './Mobile'
import {STARSHIP_HEIGHT, STARSHIP_IMG_SOURCE, STARSHIP_WIDTH} from './Source'

export default class StarShip extends Mobile {
    constructor(x, y) {
        super(x, y, 0, 8)
        this.img = this.init_img();
    }

    init_img() {
        const img = new Image();
        img.src = STARSHIP_IMG_SOURCE;
        img.height = STARSHIP_HEIGHT;
        img.width = STARSHIP_WIDTH;

        return img;
    }

    
}