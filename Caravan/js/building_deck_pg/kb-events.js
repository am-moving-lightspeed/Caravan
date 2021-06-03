kbLayout = {
    add: "KeyW",
    remove: "KeyR",
    randomize: "KeyX",
    selectAll: "KeyA",
    moveLeft: "ArrowLeft",
    moveRight: "ArrowRight"
};



(function() {

    let pickedCardsCounter = document.getElementById('picked-cards-counter');

    document.addEventListener(
        'keydown',
        (e) => {
            if (e.code === kbLayout['moveLeft']) {
                shiftLeft();
            }
        }
    );

    document.addEventListener(
        'keydown',
        (e) => {
            if (e.code === kbLayout['moveRight']) {
                shiftRight();
            }
        }
    );

    document.addEventListener(
        'keydown',
        (e) => {
            if (e.code === kbLayout['add'] && e.repeat != true) {

                let areChanged = changeMatchingCards(
                    this.curPos.absolute,
                    (index) => this.availableCards[index] !== this.cardBack
                );

                if (areChanged) {
                    pickedCardsCounter.innerText = Number.parseInt(pickedCardsCounter.innerText) + 1;
                }
            }
        }
    );

    document.addEventListener(
        'keydown',
        (e) => {
            if (e.code === kbLayout['remove'] && e.repeat != true) {

                let areChanged =changeMatchingCards(
                    this.curPos.absolute,
                    (index) => this.pickedCards[index] !== this.cardBack
                );

                if (areChanged) {
                    pickedCardsCounter.innerText = Number.parseInt(pickedCardsCounter.innerText) - 1;
                }
            }
        }
    );

    document.addEventListener(
        'keydown',
        (e) => {
            if (e.code === kbLayout['selectAll'] && e.repeat != true) {
                exchangeDecks(this.curPos.absolute);
            }
        }
    );
})();
