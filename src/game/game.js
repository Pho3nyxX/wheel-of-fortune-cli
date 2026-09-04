import Player from "./player.js";
import Round from "../round/round.js";
import Wheel from "../wheel/wheel.js";

class Game {
    constructor() {
        this.players = [];
        this.currentRound = null;
        this.wheel = new Wheel();
        this.currentPlayer = null;
        this.roundInitialized = false;
    }

    async initializePlayers(playerCount) {
        this.players = await Player.createPlayers(playerCount);
    }

    initializeRound() {
        this.currentRound = new Round();
        this.currentRound.puzzle.choosePuzzle();
        this.roundInitialized = true;
    }

    async start(playerCount) {
        await this.initializePlayers(playerCount);

        this.initializeRound();
    }
}

export default Game;