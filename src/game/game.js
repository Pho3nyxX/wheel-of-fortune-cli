import Player from "./player.js";
import Round from "../round/round.js";
import Wheel from "../wheel/wheel.js";
import Card from "../wheel/card.js";
import { choosePuzzleAction, askForLetter, askForSolution } from "../ui/prompts.js";

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

    async startNextTurn() {
        const card = this.wheel.spin();

        switch (card.type) {
            case Card.CARD_TYPE_BANKRUPT:
                console.log(
                    `${this.currentPlayer.playerName} hit BANKRUPT!`
                );

                this.currentPlayer.playerRoundTotal = 0;

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

                const puzzle = this.currentRound.puzzle;

                console.log("\nCategory:", puzzle.category);
                console.log("Puzzle:", puzzle.showPuzzle());

                const action = await choosePuzzleAction();

                if (action === "guess") {
                    const letter = await askForLetter();

                    const occurrences = puzzle.guess(letter);

                    if (occurrences > 0) {
                        const winnings = card.value * occurrences;

                        this.currentPlayer.playerRoundTotal += winnings;

                        console.log(
                            `\nCorrect! "${letter}" appears ${occurrences} time(s).`
                        );

                        console.log(`You earned $${winnings}.`);
                    } else {
                        console.log(
                            `\n"${letter}" is not in the puzzle.`
                        );
                    }

                    console.log(
                        `Round Total: $${this.currentPlayer.playerRoundTotal}`
                    );

                    console.log(
                        "\nPuzzle:",
                        puzzle.showPuzzle()
                    );
                }

                if (action === "solve") {
                    const solution = await askForSolution();

                    const solved = puzzle.solve(solution);

                    if (solved) {
                        console.log(
                            "\nCorrect! You solved the puzzle."
                        );

                        this.endRound();
                    } else {
                        console.log(
                            "\nIncorrect solution."
                        );
                    }
                }

                break;
        }

        return card;
    }

    endRound() {
        let roundWinner = this.players[0];

        for (const player of this.players) {
            if (player.playerRoundTotal > roundWinner.playerRoundTotal) {
                roundWinner = player;
            }
        }

        roundWinner.playerGrandTotal += roundWinner.playerRoundTotal;

        console.log(
            `\n🏆 ${roundWinner.playerName} wins the round!`
        );

        console.log(
            `Round Total: $${roundWinner.playerRoundTotal}`
        );

        console.log(
            `Grand Total: $${roundWinner.playerGrandTotal}`
        );

        this.currentRound.endRound();
    }

    nextPlayer() {
        this.currentPlayerIndex =
            (this.currentPlayerIndex + 1) % this.players.length;

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

    async start(playerCount) {
        await this.initializePlayers(playerCount);

        this.initializeCurrentPlayer();

        const puzzles = this.randomlyChooseThreePuzzles();

        for (const solution of puzzles) {
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
            if (
                player.playerGrandTotal >
                gameWinner.playerGrandTotal
            ) {
                gameWinner = player;
            }
        }

        console.log("\n==============================");
        console.log("       FINAL GAME RESULTS");
        console.log("==============================");

        for (const player of this.players) {
            console.log(
                `${player.playerName}: $${player.playerGrandTotal}`
            );
        }

        console.log(
            `\n🏆 ${gameWinner.playerName} wins the game!`
        );

        console.log(
            `Final Total: $${gameWinner.playerGrandTotal}`
        );
    }
}

export default Game;