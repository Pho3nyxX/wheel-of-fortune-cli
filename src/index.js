import Game from "./game/game.js";
import { displayWelcome } from "./ui/display.js";

const PLAYER_COUNT = 3;

async function start() {
    displayWelcome();

    const game = new Game();

    await game.start(PLAYER_COUNT);
}

start();