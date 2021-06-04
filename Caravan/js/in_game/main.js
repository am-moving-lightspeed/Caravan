// Setting global variables.
(function() {

    this.playersCards = document.getElementById('players-cards');

    let playersCaravanRect1 = document.getElementById('players-caravan-start-1')
                                      .getBoundingClientRect();
    let playersCaravanRect2 = document.getElementById('players-caravan-start-2')
                                      .getBoundingClientRect();
    let playersCaravanRect3 = document.getElementById('players-caravan-start-3')
                                      .getBoundingClientRect();

    this.playersCaravan1 = new Caravan();
    this.playersCaravan2 = new Caravan();
    this.playersCaravan3 = new Caravan();

    this.playersCaravans = [this.playersCaravan1, this.playersCaravan2, this.playersCaravan3];

    [this.playersCaravan1.x, this.playersCaravan1.y] = [playersCaravanRect1.x, playersCaravanRect1.y];
    [this.playersCaravan2.x, this.playersCaravan2.y] = [playersCaravanRect2.x, playersCaravanRect2.y];
    [this.playersCaravan3.x, this.playersCaravan3.y] = [playersCaravanRect3.x, playersCaravanRect2.y];

    movePickedCard(this.playersCaravan1.x, this.playersCaravan1.y);
})();



// Setting default KB shortcuts.
(function() {

    let selectBtn = document.getElementById('select-btn');
    let discardCardBtn = document.getElementById('discard-card-btn');
    let discardCaravanBtn = document.getElementById('discard-caravan-btn');
    let forfeitBtn = document.getElementById('forfeit-btn');

    selectBtn.setAttribute('hotkey', this.kbLayoutSymbols['select']);
    discardCardBtn.setAttribute('hotkey', this.kbLayoutSymbols['discardCard']);
    discardCaravanBtn.setAttribute('hotkey', this.kbLayoutSymbols['discardCaravan']);
    forfeitBtn.setAttribute('hotkey', this.kbLayoutSymbols['forfeit']);
})();



// Setting default events.
(function() {

    let selectBtn = document.getElementById('select-btn');
    let discardCardBtn = document.getElementById('discard-card-btn');
    let discardCaravanBtn = document.getElementById('discard-caravan-btn');
    let forfeitBtn = document.getElementById('forfeit-btn');

    selectBtn.addEventListener(
        'click',
        (e) => {
            pickCard();
        }
    );
})();



function selectCard(newIndex, oldIndex) {

    let cardsInHand = document.getElementById('players-cards-in-hand').children;

    cardsInHand[oldIndex].classList.remove('card--selected');
    cardsInHand[newIndex].classList.add('card--selected');

    this.pickedCardIndex = newIndex;
}



function pickCard() {

    if (this.controlMode.current === ControlMode.default) {
        let pickedCardInHand = document.getElementById('players-cards-in-hand')
                                       .getElementsByClassName('card--selected')[0];
        let pickedCard = document.getElementById('picked-card');

        pickedCard.setAttribute(
            'src',
            pickedCardInHand.getAttribute('src')
        );
        pickedCard.style.display = 'block';

        this.controlMode.current = ControlMode.alt;
        this.currentCaravan = 0;

        checkIfCardAcceptable(this.playersCaravans[this.currentCaravan]);
    }
}



function discardCard(arguments) {

}



function movePickedCardToNextCaravan() {

    if (this.currentCaravan + 1 < 3) {
        let caravan = this.playersCaravans[++this.currentCaravan];
        movePickedCard(caravan.x, caravan.y);

        checkIfCardAcceptable(caravan);
    }
}



function movePickedCardToPreviousCaravan() {

    if (this.currentCaravan - 1 >= 0) {
        let caravan = this.playersCaravans[--this.currentCaravan];
        movePickedCard(caravan.x, caravan.y);

        checkIfCardAcceptable(caravan);
    }
}



function movePickedCard(x, y) {

    let pickedCard = document.getElementById('picked-card');

    pickedCard.style.left = x + 'px';
    pickedCard.style.top = y + 'px';
}



function checkIfCardAcceptable(caravan) {

    let pickedCard = this.cardsInHand[this.playerInfo.selectedCardPos];
    let isAcceptable = caravan.checkCard(pickedCard);
    let pickedCardElement = document.getElementById('picked-card');

    if (isAcceptable) {
        pickedCardElement.style.borderColor = "rgba(145, 190, 115)";
    } else {
        pickedCardElement.style.borderColor = "rgba(220, 80, 95)";
    }
}
