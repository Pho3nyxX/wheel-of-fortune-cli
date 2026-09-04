
import Game from "./game/game.js";
import { choosePuzzleAction, askForLetter, askForSolution } from "./ui/prompts.js";

const PLAYER_COUNT = 3;

async function start() {
    const game = new Game();

    await game.start(PLAYER_COUNT);

    const puzzle = game.currentRound.puzzle;

    console.log("\nCategory:", puzzle.category);
    console.log("Puzzle:", puzzle.showPuzzle());

    const action = await choosePuzzleAction();

    if (action === "guess") {
        const letter = await askForLetter();

        const occurrences = puzzle.guess(letter);

        if (occurrences > 0) {
            console.log(
                `\nCorrect! "${letter}" appears ${occurrences} time(s).`
            );
        } else {
            console.log(
                `\n"${letter}" is not in the puzzle.`
            );
        }

        console.log("\nPuzzle:", puzzle.showPuzzle());
    }

    if (action === "solve") {
        const solution = await askForSolution();

        const solved = puzzle.solve(solution);

        if (solved) {
            console.log("\nCorrect! You solved the puzzle.");
            game.currentRound.endRound();
        } else {
            console.log("\nIncorrect solution.");
        }
    }
}

start();