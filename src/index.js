import Player from "./game/player.js";

const PLAYER_COUNT = 3;

async function start() {
    console.log("Wheel of Fortune CLI\n");

    const players = await Player.createPlayers(PLAYER_COUNT);

    console.log("\nPlayers:");

    players.forEach((player, index) => {
        console.log(`${index + 1}. ${player.playerName}`);
    });
}

start();