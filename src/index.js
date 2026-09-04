import Game from "./game/game.js";

const PLAYER_COUNT = 3;

async function start() {
    console.log("Wheel of Fortune CLI\n");

    const game = new Game();

    await game.start(PLAYER_COUNT);

    console.log("\n🎉 Game Complete!");

    console.log("\nFinal Scores:");

    game.players.forEach((player) => {
        console.log(
            `${player.playerName}: $${player.playerGrandTotal}`
        );
    });
}

start();