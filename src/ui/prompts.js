import { input, select } from "@inquirer/prompts";

export async function choosePuzzleAction() {
    return await select({
        message: "What would you like to do?",
        choices: [
            {
                name: "Guess a letter",
                value: "guess",
            },
            {
                name: "Solve puzzle",
                value: "solve",
            },
        ],
    });
}

export async function askForLetter() {
    return await input({
        message: "Enter a letter:",
        validate: (value) => {
            if (value.length !== 1 || !/[a-zA-Z]/.test(value)) {
                return "Please enter one letter.";
            }

            return true;
        },
    });
}

export async function askForSolution() {
    return await input({
        message: "Enter your solution:",
        validate: (value) => {
            if (!value.trim()) {
                return "Solution cannot be empty.";
            }

            return true;
        },
    });
}