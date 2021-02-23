import Mobile from './Mobile'
import {BULLET_HEIGHT, BULLET_IMG_SOURCE, BULLET_WIDTH} from './Source'

export default class Shoot extends Mobile {
    constructor(x, y) {
        super(x, y, 8, 0);
        this.img = this.init_img(BULLET_IMG_SOURCE,BULLET_HEIGHT,BULLET_WIDTH);
    }

}