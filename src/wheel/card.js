class Card {
    static CARD_TYPE_MONEY = "MONEY";
    static CARD_TYPE_BANKRUPT = "BANKRUPT";
    static CARD_TYPE_LOSE_A_TURN = "LOSE A TURN";

    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}

export default Card;