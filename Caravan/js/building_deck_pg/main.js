// Setting global variables.
(function() {

    this.availableCardsList = document.getElementsByName('available-cards')[0];
    this.pickedCardsList = document.getElementsByName('picked-cards')[0];
})();


// Setting default KB shortcuts.
(function() {

    let addBtn = document.getElementById('add-btn');
    let removeBtn = document.getElementById('remove-btn');
    let randomizeBtn = document.getElementById('randomize-btn');
    let selectAllBtn = document.getElementById('select-all-btn');
    let backBtn = document.getElementById('back-btn');

    addBtn.setAttribute('hotkey', this.buildingDeckPageKbLayoutSymbols['add']);
    removeBtn.setAttribute('hotkey', this.buildingDeckPageKbLayoutSymbols['remove']);
    randomizeBtn.setAttribute('hotkey', this.buildingDeckPageKbLayoutSymbols['randomize']);
    selectAllBtn.setAttribute('hotkey', this.buildingDeckPageKbLayoutSymbols['selectAll']);
})();



// Settings default events.
(function() {

    let addBtn = document.getElementById('add-btn');
    let removeBtn = document.getElementById('remove-btn');
    let randomizeBtn = document.getElementById('randomize-btn');
    let selectAllBtn = document.getElementById('select-all-btn');
    let backBtn = document.getElementById('back-btn');

    // TODO: add events.
    // NOTE: Replace assign().
    backBtn.addEventListener(
        'click',
        (e) => location.assign('index.html')
    );
})();



// Placing fixed amount of cards according screen width.
(function() {

    let width = document.documentElement.clientWidth;
    let dummyCardsAmount = screenWidthMap.getMappedValue(width);

    this.curPos = new PositionPointer(dummyCardsAmount, this.availableCards.length);

    for (var i = 0; i < dummyCardsAmount; i++) {
        // FIXME: replace with true.
        placeCard(this.imgManager.dummy, this.availableCardsList, false);
        placeCard(this.imgManager.dummy, this.pickedCardsList, false);
    }

    for (var i = 0; i < dummyCardsAmount + 1; i++) {
        placeCard(
            this.imgManager.getFilepath(this.availableCards[i]),
            this.availableCardsList
        );
        placeCard(
            this.imgManager.getFilepath(this.pickedCards[i]),
            this.pickedCardsList
        );
    }
})();



// 'Shift left' button event.
(function() {

    let shiftLeftBtn = document.getElementById('shift-left-btn');

    shiftLeftBtn.addEventListener(
        'click',
        (event) => {
            this.curPos.shiftLeft();

            if (!this.curPos.isAtRightRelativeLimit) {
                recycleCard(
                    this.imgManager.getFilepath(this.availableCards[this.curPos.relative]),
                    this.availableCardsList,
                    false
                );
                recycleCard(
                    this.imgManager.getFilepath(this.pickedCards[this.curPos.relative]),
                    this.pickedCardsList,
                    false
                );
            } else if (!this.curPos.isAtRightAbsoluteLimit) {
                // FIXME: replace with true.
                recycleCard(this.imgManager.dummy, this.availableCardsList, false);
                recycleCard(this.imgManager.dummy, this.pickedCardsList, false);
            }
        }
    );
})();



// 'Shift right' button event.
(function() {

    let shiftRightBtn = document.getElementById('shift-right-btn');

    shiftRightBtn.addEventListener(
        'click',
        (event) => {
            this.curPos.shiftRight();

            if (!this.curPos.isAtLeftRelativeLimit) {
                recycleCardReverse(
                    this.imgManager.getFilepath(this.availableCards[this.curPos.relative]),
                    this.availableCardsList,
                    false
                );
                recycleCardReverse(
                    this.imgManager.getFilepath(this.pickedCards[this.curPos.relative]),
                    this.pickedCardsList,
                    false
                );
            } else if (!this.curPos.isAtLeftAbsoluteLimit) {
                // FIXME: replace with true.
                recycleCardReverse(this.imgManager.dummy, this.availableCardsList, false);
                recycleCardReverse(this.imgManager.dummy, this.pickedCardsList, false);
            }
        }
    );
})();



function recycleCard(filepath, deck, isIvisible = false) {

    let li = deck.firstElementChild;
    let img = li.firstElementChild;

    deck.removeChild(li);

    img.className = 'card';
    img.setAttribute('src', filepath);

    if (isIvisible) {
        img.classList.add('card--invisible');
    }

    deck.appendChild(li);
}



function recycleCardReverse(filepath, deck, isIvisible = false) {

    let li = deck.lastElementChild;
    let img = li.firstElementChild;

    deck.removeChild(li);

    img.className = 'card';
    img.setAttribute('src', filepath);

    if (isIvisible) {
        img.classList.add('card--invisible');
    }

    deck.insertBefore(li, deck.firstElementChild);
}



function placeCard(filepath, deck, isIvisible = false) {

    let li = document.createElement('li');
    let img = document.createElement('img');

    img.classList.add('card');
    img.setAttribute('src', filepath);

    if (isIvisible) {
        img.classList.add('card--invisible');
    }

    li.appendChild(img);
    deck.appendChild(li);
}
