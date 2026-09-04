const puzzles = [
    "Spin to win!",
    "Take a spin on the wheel of destiny",
    "Your fate is in your hands... and on the wheel!",
    "Come and take a turn for the better!",
    "Wheel of fortune will change your life",
];

const categories = [
    "Phrase",
    "Phrase",
    "Phrase",
    "Phrase",
    "Phrase",
];

class Puzzle {
    constructor() {
        this.guessedCharacters = "";
        this.category = "";
        this.solution = "";
    }

    choosePuzzle() {
        const index = Math.floor(Math.random() * puzzles.length);

        this.solution = puzzles[index];
        this.category = categories[index];
    }

    showPuzzle() {
        if (!this.solution) {
            this.choosePuzzle();
        }

        let displayedPuzzle = "";

        for (const character of this.solution) {
            if (
                /[a-zA-Z]/.test(character) &&
                !this.guessedCharacters.includes(character.toLowerCase())
            ) {
                displayedPuzzle += "_";
            } else {
                displayedPuzzle += character;
            }
        }

        return displayedPuzzle;
    }

    guess(guess) {
        guess = guess.toLowerCase();

        if (guess.length !== 1 || !/[a-z]/.test(guess)) {
            return 0;
        }

        if (this.guessedCharacters.includes(guess)) {
            return 0;
        }

        let count = 0;

        for (const character of this.solution.toLowerCase()) {
            if (character === guess) {
                count++;
            }
        }

        if (count > 0) {
            this.guessedCharacters += guess;
        }

        return count;
    }

    solve(solution) {
        return this.solution.toLowerCase() === solution.trim().toLowerCase();
    }
}

export default Puzzle;