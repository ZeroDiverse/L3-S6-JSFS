export default class Game {

    constructor(canvas, width, height, starship) {
        this.canvas = canvas
        this.width = width
        this.height = height
        this.starship = starship
    }


    initStarship(){
        this.starship.draw(this.canvas.getContext("2d"))
    }

    
}