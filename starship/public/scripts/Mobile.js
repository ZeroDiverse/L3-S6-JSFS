
import {LifeState} from './Source'

/**
 * Mobile class, this class is used like abstract class for starship, shoot and saucer
 */
export default class Mobile {

    constructor(x, y, deltaX, deltaY) {
        this.x = x;
        this.y = y;
        this.deltaX = deltaX;
        this.deltaY = deltaY;
        this.active = LifeState.ACTIVE;
        this.img = null
    }

    /**
     * Init the src, height, width of the image
     * @param src_img source of image
     * @param height height of image
     * @param width width of image
     * @returns {HTMLImageElement} the image after initialise
     */
    init_img(src_img, height, width) {
        //Create a new image
        const img = new Image();
        //Set the source of the image
        img.src = src_img;
        //Set the height of the image
        img.height = height;
        //Set the width of the image
        img.width = width;
        //Return the image instance
        return img;
    }

    /**
     * Draw the object to context of canvas
     * @param context the context
     */
    draw(context) {
        //Draw image to context with position x and y
        context.drawImage(this.img, this.x, this.y);
    }

    /**
     * calculate the new position of x and y
     */
    move() {
        this.x += this.deltaX;
        this.y += this.deltaY;
    }

    /**
     * This method is to move - calculate the new position of x and y and then redraw the object
     * @param context the context
     */
    update(context) {
        this.move();
        this.draw(context);
    }

    /**
     * Return the collision status with the saucer
     * @param saucer the saucer
     * @returns {boolean} the status of collision with the saucer
     */
    collisionWith(saucer) {
        let x1 = this.x, y1 = this.y;
        let x2 = this.x + this.img.width, y2 = this.y + this.img.height;
        let px = saucer.x, py = saucer.y;
        let px1 = saucer.x + saucer.img.width, py1 = saucer.y + saucer.img.height;

        let kx = Math.max(x1, px), ky = Math.max(y1, py);
        let kx1 = Math.min(x2, px1), ky1 = Math.min(y2, py1);

        return kx <= kx1 && ky <= ky1;
    }
}
