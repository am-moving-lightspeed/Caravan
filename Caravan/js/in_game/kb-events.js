kbLayout = {
    pick: "KeyW",
    discardCard: "KeyD",
    discardCaravan: "KeyX",
    'forfeit/cancel': "Escape",
    moveLeft: "ArrowLeft",
    moveRight: "ArrowRight"
};



(function() {

    document.addEventListener(
        'keydown',
        (e) => {
            if (e.code === kbLayout['pick'] && e.repeat != true) {

                if (this.controlMode.current === ControlMode.default) {
                    pickCard();
                }
                else if (this.controlMode.current === ControlMode.alt) {

                }
            }
        }
    );

    document.addEventListener(
        'keydown',
        (e) => {
            if (e.code === kbLayout['moveLeft'] && e.repeat != true) {

                if (this.controlMode.current === ControlMode.default) {

                    this.playerInfo.decrementSelectedCardPos();
                    selectCard(
                        this.playerInfo.selectedCardPos,
                        this.playerInfo.prevSelectedCardPos
                    );

                } else if (this.controlMode.current === ControlMode.alt) {
                    movePickedCardToPreviousCaravan();
                }
            }
        }
    );

    document.addEventListener(
        'keydown',
        (e) => {
            if (e.code === kbLayout['moveRight'] && e.repeat != true) {

                if (this.controlMode.current === ControlMode.default) {

                    this.playerInfo.incrementSelectedCardPos();
                    selectCard(
                        this.playerInfo.selectedCardPos,
                        this.playerInfo.prevSelectedCardPos
                    );

                } else if (this.controlMode.current === ControlMode.alt) {
                    movePickedCardToNextCaravan();
                }
            }
        }
    );

    document.addEventListener(
        'keydown',
        (e) => {

            if (e.code === kbLayout['forfeit/cancel'] && e.repeat != true) {

                if (this.controlMode.current === ControlMode.default) {


                } else if (this.controlMode.current === ControlMode.alt) {

                    let pickedCard = document.getElementById('picked-card');
                    pickedCard.style.display = 'none';

                    movePickedCard(
                        this.playersCaravans[0].x,
                        this.playersCaravans[0].y,
                    );

                    this.controlMode.current = ControlMode.default;
                    this.currentCaravan = undefined;
                }
            }
        }
    );
})();
