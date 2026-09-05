import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";

export function displayWelcome() {
    console.clear();

    console.log(
        gradient.rainbow(
            figlet.textSync("Wheel of Fortune", {
                horizontalLayout: "default",
                verticalLayout: "default",
            })
        )
    );

    console.log(
        chalk.yellow("\nWelcome to Wheel of Fortune!\n")
    );
}

export function displayRound(roundNumber) {
    console.log(
        chalk.cyan("\n==============================")
    );

    console.log(
        chalk.cyan(`          ROUND ${roundNumber}`)
    );

    console.log(
        chalk.cyan("==============================\n")
    );
}

export function displayPlayer(player) {
    console.log(
        chalk.yellow(
            `\nCurrent Player: ${player.playerName}`
        )
    );

    console.log(
        chalk.green(
            `Round Total: $${player.playerRoundTotal}`
        )
    );
}

export function displayWheelResult(card) {
    if (card.type === "MONEY") {
        console.log(
            chalk.green(`\nYou spun $${card.value}!`)
        );
    }

    if (card.type === "BANKRUPT") {
        console.log(
            chalk.red("\nBANKRUPT!")
        );
    }

    if (card.type === "LOSE A TURN") {
        console.log(
            chalk.magenta("\nLOSE A TURN!")
        );
    }
}

export function displayPuzzle(puzzle) {
    console.log(
        chalk.blue(`\nCategory: ${puzzle.category}`)
    );

    console.log(
        chalk.whiteBright(
            `Puzzle: ${puzzle.showPuzzle()}`
        )
    );
}

export function displayCorrectGuess(letter, occurrences, winnings) {
    console.log(
        chalk.green(
            `\n✓ "${letter}" appears ${occurrences} time(s).`
        )
    );

    console.log(
        chalk.green(`You earned $${winnings}.`)
    );
}

export function displayIncorrectGuess(letter) {
    console.log(
        chalk.red(
            `\n✗ "${letter}" is not in the puzzle.`
        )
    );
}

export function displayIncorrectSolution() {
    console.log(
        chalk.red("\n✗ Incorrect solution.")
    );
}

export function displaySolvedPuzzle() {
    console.log(
        chalk.green(
            "\nCorrect! You solved the puzzle!"
        )
    );
}

export function displayRoundWinner(player) {
    console.log(
        chalk.yellow(
            `\n🏆 ${player.playerName} wins the round!`
        )
    );

    console.log(
        chalk.green(
            `Round Total: $${player.playerRoundTotal}`
        )
    );

    console.log(
        chalk.green(
            `Grand Total: $${player.playerGrandTotal}`
        )
    );
}

export function displayFinalResults(players, winner) {
    console.log(
        chalk.cyan("\n==============================")
    );

    console.log(
        chalk.cyan("       FINAL GAME RESULTS")
    );

    console.log(
        chalk.cyan("==============================\n")
    );

    for (const player of players) {
        console.log(
            `${player.playerName}: $${player.playerGrandTotal}`
        );
    }

    console.log(
        chalk.yellow(
            `\n🏆 ${winner.playerName} wins the game!`
        )
    );

    console.log(
        chalk.green(
            `Final Total: $${winner.playerGrandTotal}`
        )
    );
}