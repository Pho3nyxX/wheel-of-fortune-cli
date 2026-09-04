import Player from "./player.js";
import Round from "../round/round.js";
import Wheel from "../wheel/wheel.js";
import Card from "../wheel/card.js";

class Game {
    constructor() {
        this.players = [];
        this.currentRound = null;
        this.wheel = new Wheel();
        this.currentPlayer = null;
        this.currentPlayerIndex = 0;
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

    initializeCurrentPlayer() {
        this.currentPlayerIndex = 0;
        this.currentPlayer = this.players[this.currentPlayerIndex];
    }

    startNextTurn() {
        const card = this.wheel.spin();

        switch (card.type) {
            case Card.CARD_TYPE_BANKRUPT:
                console.log(
                    `${this.currentPlayer.playerName} hit BANKRUPT!`
                );
                break;

            case Card.CARD_TYPE_LOSE_A_TURN:
                console.log(
                    `${this.currentPlayer.playerName} loses a turn!`
                );
                break;

            case Card.CARD_TYPE_MONEY:
                console.log(
                    `${this.currentPlayer.playerName} spun $${card.value}!`
                );
                break;
        }

        return card;
    }

    nextPlayer() {
        this.currentPlayerIndex =
            (this.currentPlayerIndex + 1) % this.players.length;

        this.currentPlayer = this.players[this.currentPlayerIndex];
    }

    async start(playerCount) {
        await this.initializePlayers(playerCount);
        this.initializeRound();
        this.initializeCurrentPlayer();
    }
}

export default Game;