import Game from "./game/game.js";
import { displayWelcome } from "./ui/display.js";

const PLAYER_COUNT = 3;

async function start() {
    displayWelcome();

    const game = new Game();

    await game.start(PLAYER_COUNT);
}

start().catch((error) => {
    if (error?.name === "ExitPromptError") {
        console.log("\n👋 Thanks for playing Wheel of Fortune!");
        return;
    }

    console.error(
        "\nSomething went wrong while running the game."
    );

    console.error(
        "Please try running the game again."
    );
});