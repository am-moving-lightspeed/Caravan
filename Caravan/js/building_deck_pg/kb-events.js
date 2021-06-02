kbLayout = {
    add: "KeyE",
    remove: "KeyR",
    randomize: "KeyM",
    selectAll: "KeyA",
    moveLeft: "ArrowLeft",
    moveRight: "ArrowRight"
};



(function() {

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
                changeMatchingCards(
                    this.curPos.absolute,
                    (index) => this.availableCards[index] !== this.cardBack
                );
            }
        }
    );

    document.addEventListener(
        'keydown',
        (e) => {
            if (e.code === kbLayout['remove'] && e.repeat != true) {
                changeMatchingCards(
                    this.curPos.absolute,
                    (index) => this.pickedCards[index] !== this.cardBack
                );
            }
        }
    );
})();
