import { input } from "@inquirer/prompts";

class Player {
    constructor(playerName) {
        this.playerName = playerName;
        this.playerRoundTotal = 0;
        this.playerGrandTotal = 0;
    }

    static async createPlayers(playerCount) {
        const players = [];

        for (let i = 0; i < playerCount; i++) {
            const name = await input({
                message: `Enter player ${i + 1} name:`,
                validate: (value) => {
                    if (!value.trim()) {
                        return "Player name cannot be empty.";
                    }

                    return true;
                },
            });

            players.push(new Player(name.trim()));
        }

        return players;
    }
}

export default Player;