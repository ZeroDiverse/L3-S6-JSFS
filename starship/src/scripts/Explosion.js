
import Mobile from './Mobile'
import {EXPLOSION_TIME,SAUCER_WIDTH,SAUCER_HEIGHT,LifeState,getRandomInt} from './Source'

/**
 * Explosion class inherit from Mobile - This class represent the explosion of the saucer
 */
export default class Explosion extends Mobile {
	constructor(x, y) {
        super(x + getRandomInt(0, SAUCER_WIDTH/2), y + getRandomInt(0, SAUCER_HEIGHT/2), 0, 0);
        this.time_created = new Date().getTime() / 1000;
        this.expl = [getRandomInt(10,15), getRandomInt(15,18), getRandomInt(1,2)+0.5, 2];
    }

    /**
     * @Overriding
	 * expl[0] : radius of circle
	 * expl[1] : thickness of circle
	 * constant expl[2] : radius increases expl[2]
	 * constant expl[3] : thickness of circle decreased expl[3]
	 * Explosion will be disappeared when thickness of circle <= 0
	 *                               or 2 seconds passed
     */
    draw(context) {
    	if (this.expl[1] > 0) {
                this.drawCircle(context, this.x, this.y, this.expl[0], this.expl[1]);
                this.expl[0] += this.expl[2];
                this.expl[1] -= this.expl[3];

                this.expl[2] *= 1.6
                this.expl[3] *= 1.1
        }
    }

    /**
     * @Overriding
	 *
     */
    update(context) {
    	let now = new Date().getTime() / 1000;
    	
    	/**
    	 *
    	 * Make sure Explosion will be disappreared
    	 */
    	if(now - this.time_created > EXPLOSION_TIME) {
    		this.active = LifeState.DISACTIVE;
    	}

    	this.draw(context);
    }

    drawCircle(context, x, y, r, b) {
        let k = getRandomInt(0, 6);

        context.beginPath();
        context.arc(x, y, r, 0, 2*Math.PI);
        context.lineWidth = b;
        context.strokeStyle = (k == 2) ? "yellow" : "red";
        context.strokeStyle = (k == 3) ? "orange" : "red";
        context.stroke();
    } 

}