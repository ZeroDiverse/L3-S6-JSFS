import Saucer from './Saucer'

export default class Game {

    constructor(canvas, width, height, starship) {
        this.canvas = canvas
        this.width = width
        this.height = height
        //Starship - player
        this.starship = starship
        //Init saucers with empty array
        this.saucers = []
        //Score beginning is equal to 0
        this.score = 0
    }


    initStarship() {
        this.starship.draw(this.canvas.getContext("2d"))
    }

    addSaucer() {
        const newSaucer = new Saucer(this.canvas.width - 100, Math.random() * this.canvas.height / 2)
        newSaucer.draw(this.canvas.getContext("2d"))
        this.saucers.push(newSaucer)
    }

}
