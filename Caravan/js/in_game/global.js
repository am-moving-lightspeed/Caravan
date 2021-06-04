kbLayoutSymbols = {
    select: '(w)',
    discardCard: '(d)',
    discardCaravan: '(x)',
    forfeit: '(esc)'
};



class ControlMode {

    static default = 'default';
    static alt = 'alternative';


    constructor() {

        this._current = ControlMode.default;
    }

    get current() {

        return this._current;
    }

    set current(value) {

        if (value === ControlMode.default || value === ControlMode.alt) {
            this._current = value;
        }
    }
}
controlMode = new ControlMode();



class PlayerInfo {

    constructor() {

        this.selectedCardPos = 0;
        this.prevSelectedCardPos = 0;
    }

    decrementSelectedCardPos() {

        this.prevSelectedCardPos = this.selectedCardPos;
        if (--this.selectedCardPos < 0) {
            this.selectedCardPos += 5;
        }
    }

    incrementSelectedCardPos() {

        this.prevSelectedCardPos = this.selectedCardPos;
        if (++this.selectedCardPos >= 5) {
            this.selectedCardPos -= 5;
        }
    }
}
playerInfo = new PlayerInfo();



class Card {

    // FIXME: fix jokers.
    static specialCardValues = ['J', 'Q', 'K', 'JKR_A', 'JKR_B'];


    constructor(str) {

        // If Joker card.
        if (str === 'JKR_A' || str === 'JKR_B') {
            this.value = str;
            this.suit = null;
        }
        // If Jack, Queen or King card.
        else if (Card.specialCardValues.includes(str[0])) {
            this.value = str[0];
            this.suit = str[1];
        }
        // If card of value 10 with any suit.
        else if (str.length == 3) {
            this.value = Number.parseInt(str.substr(1, 2));
            this.suit = str[2];
        }
        // Otherwise.
        else {
            this.value = str[0] === 'A' ? 1 : Number.parseInt(str[0]);
            this.suit = str[1];
        }
    }


    isSpecial() {

        return Card.specialCardValues.includes(this.value);
    }
}



class Caravan {

    constructor() {
        // Either null, 'asc' or 'desc'.
        this.dir = null;
        this.suit = null;

        this.vacantPos = {x: 0, y: 0};

        this.cards = [];
    }

    get x() {

        return this.vacantPos.x;
    }

    set x(x) {

        this.vacantPos.x = x;
    }

    get y() {

        return this.vacantPos.y;
    }

    set y(y) {

        this.vacantPos.y = y;
    }


    checkCard(card) {

        let lastCardRow = this.cards[this.cards.length - 1];

        if (!card.isSpecial()) {

            if (lastCardRow !== undefined) {
                let lastCard = lastCardRow[0];

                if (this.dir === 'asc' && lastCard.value < card.value) {
                    return true;
                }
                else if (this.dir === 'desc' && lastCard.value > card.value) {
                    return true;
                }
                else if (this.suit === card.suit && lastCard.value != card.value) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return true;
            }
        }
        else {
            console.log('wrong');
            return false;
        }
    }

}



// Temp.
cardsInHand = [
    new Card('2C'),
    new Card('5D'),
    new Card('10S'),
    new Card('KC'),
    new Card('JH')
];
