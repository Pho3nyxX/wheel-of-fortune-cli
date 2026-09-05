import Player from "./player.js";
import Round from "../round/round.js";
import Wheel from "../wheel/wheel.js";
import Card from "../wheel/card.js";
import { choosePuzzleAction, askForLetter, askForSolution } from "../ui/prompts.js";
import {
    displayPlayer,
    displayWheelResult,
    displayPuzzle,
    displayCorrectGuess,
    displayIncorrectGuess,
    displayIncorrectSolution,
    displaySolvedPuzzle,
    displayRoundWinner,
    displayFinalResults,
    displayRound,
} from "../ui/display.js";

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

    initializeRound(puzzleText) {
        this.currentRound = new Round();

        this.currentRound.puzzle.solution = puzzleText;
        this.currentRound.puzzle.category = "Phrase";

        this.roundInitialized = true;
    }

    initializeCurrentPlayer() {
        this.currentPlayerIndex = 0;
        this.currentPlayer = this.players[this.currentPlayerIndex];
    }

    randomlyChooseThreePuzzles() {
        const puzzles = [];

        while (puzzles.length < 3) {
            const round = new Round();

            round.puzzle.choosePuzzle();

            if (!puzzles.includes(round.puzzle.solution)) {
                puzzles.push(round.puzzle.solution);
            }
        }

        return puzzles;
    }

    async startNextTurn() {
        const card = this.wheel.spin();

        displayPlayer(this.currentPlayer);
        displayWheelResult(card);

        switch (card.type) {
            case Card.CARD_TYPE_BANKRUPT:
                this.currentPlayer.playerRoundTotal = 0;

                break;

            case Card.CARD_TYPE_LOSE_A_TURN:
                break;

            case Card.CARD_TYPE_MONEY:
                const puzzle = this.currentRound.puzzle;

                displayPuzzle(puzzle);

                const action = await choosePuzzleAction();

                if (action === "guess") {
                    const letter = await askForLetter();

                    const occurrences = puzzle.guess(letter);

                    if (occurrences > 0) {
                        const winnings = card.value * occurrences;

                        this.currentPlayer.playerRoundTotal += winnings;

                        displayCorrectGuess(letter, occurrences, winnings);
                    } else {
                        displayIncorrectGuess(letter);
                    }

                    console.log(
                        `Round Total: $${this.currentPlayer.playerRoundTotal}`
                    );

                    console.log("\nPuzzle:", puzzle.showPuzzle());
                }

                if (action === "solve") {
                    const solution = await askForSolution();

                    const solved = puzzle.solve(solution);

                    if (solved) {
                        displaySolvedPuzzle();
                        this.endRound();
                    } else {
                        displayIncorrectSolution();
                    }
                }

                break;
        }

        return card;
    }

    nextPlayer() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;

        this.currentPlayer = this.players[this.currentPlayerIndex];
    }

    endRound() {
        let roundWinner = this.players[0];

        for (const player of this.players) {
            if (player.playerRoundTotal > roundWinner.playerRoundTotal) {
                roundWinner = player;
            }
        }

        roundWinner.playerGrandTotal += roundWinner.playerRoundTotal;

        displayRoundWinner(roundWinner);

        this.currentRound.endRound();
    }

    async start(playerCount) {
        await this.initializePlayers(playerCount);

        this.initializeCurrentPlayer();

        const puzzles = this.randomlyChooseThreePuzzles();

        for (let i = 0; i < puzzles.length; i++) {
            const solution = puzzles[i];

            displayRound(i + 1);

            this.initializeRound(solution);

            while (!this.currentRound.hasEnded) {
                await this.startNextTurn();

                if (!this.currentRound.hasEnded) {
                    this.nextPlayer();
                }
            }

            for (const player of this.players) {
                player.playerRoundTotal = 0;
            }
        }

        let gameWinner = this.players[0];

        for (const player of this.players) {
            if (player.playerGrandTotal > gameWinner.playerGrandTotal) {
                gameWinner = player;
            }
        }

        displayFinalResults(
            this.players,
            gameWinner
        );
    }
}

export default Game;