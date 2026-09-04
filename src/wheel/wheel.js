import Card from "./card.js";

class Wheel {
    constructor() {
        this.cards = [];
        this.generateCards();
        this.wheelInitialized = true;
    }

    generateCards() {
        let dollarValue = 300;

        for (let i = 0; i < 24; i++) {
            switch (i) {
                case 0:
                case 15:
                    this.cards[i] = new Card(Card.CARD_TYPE_BANKRUPT, 0);
                    dollarValue = 300;
                    break;
                case 7:
                    this.cards[i] = new Card(Card.CARD_TYPE_LOSE_A_TURN, 0);
                    break;
                default:
                    this.cards[i] = new Card(Card.CARD_TYPE_MONEY, dollarValue);
                    dollarValue += 50;
                    break;
            }
        }
    }

    spin() {
        const index = Math.floor(Math.random() * this.cards.length);

        return this.cards[index];
    }
}

export default Wheel;