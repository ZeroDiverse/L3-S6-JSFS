import Saucer from './Saucer'
import Shoot from './Shoot'

export default class Game {

    constructor(canvas, width, height, starship) {
        this.canvas = canvas
        this.context = canvas.getContext("2d");
        this.width = width
        this.height = height
        //Starship - player
        this.starship = starship
        //Init saucers with empty array
        this.saucers = []
        //Init shoots with empty array
        this.shoots = []
        //Score beginning is equal to 0
        this.score = 0
    }

    addSaucer() {
        const newSaucer = new Saucer(this.canvas.width - 100, Math.random() * this.canvas.height / 2)
        // newSaucer.draw(this.canvas.getContext("2d"))
        this.saucers.push(newSaucer)
    }

    addShoot() {
        const newShoot = new Shoot(this.starship.x + 20, this.starship.y + 32)
        // newSaucer.draw(this.canvas.getContext("2d"))
        this.shoots.push(newShoot)
    }

    update() {
        let that = this;

        this.starship.move(this.canvas);
        this.starship.draw(this.context);

        this.saucers.forEach(saucer => {
            if(saucer.active){
                this.shoots.forEach(shoot => {
                    if(shoot.collisionWith(saucer)){
                        saucer.fall();
                        this.score += 200;
                    }
                });
            }
        });

        this.saucers = this.saucers.filter(element => element.active);

        this.saucers.forEach((element) => {
            element.update(that.context);
        });

        this.shoots = this.shoots.filter(element => element.active);

        this.shoots.forEach((element) => {
            element.update(that.context);
        });

        // console.log(this.shoots);
        // console.log(this.saucers);
    }

}
