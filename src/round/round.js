import Puzzle from "../puzzle/puzzle.js";

class Round {
    constructor() {
        this.puzzle = new Puzzle();
        this.hasEnded = false;
    }

    endRound() {
        this.hasEnded = true;
    }
}

export default Round;