import Game from "./game/game.js";

const PLAYER_COUNT = 3;

async function start() {
    console.log("Wheel of Fortune CLI\n");

    const game = new Game();

    await game.start(PLAYER_COUNT);

    console.log("\nPlayers:");

    game.players.forEach((player, index) => {
        console.log(`${index + 1}. ${player.playerName}`);
    });

    console.log("\nCategory:", game.currentRound.puzzle.category);
    console.log("Puzzle:", game.currentRound.puzzle.showPuzzle());

    // console.log("\nWheel spin:", game.wheel.spin());
}

start();