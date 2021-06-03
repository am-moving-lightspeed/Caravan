// Setting global variables.
(function() {

    this.availableCardsList = document.getElementsByName('available-cards')[0];
    this.pickedCardsList = document.getElementsByName('picked-cards')[0];
})();



// Pre-initialize.
(function() {

    let pickedCardsCounter = document.getElementById('picked-cards-counter');
    let totalCardsCounter = document.getElementById('total-cards-counter');

    totalCardsCounter.innerText = this.availableCards.length;
    pickedCardsCounter.innerText = 0;
})();


// Setting default KB shortcuts.
(function() {

    let addBtn = document.getElementById('add-btn');
    let removeBtn = document.getElementById('remove-btn');
    let randomizeBtn = document.getElementById('randomize-btn');
    let selectAllBtn = document.getElementById('select-all-btn');
    let backBtn = document.getElementById('back-btn');

    addBtn.setAttribute('hotkey', this.kbLayoutSymbols['add']);
    removeBtn.setAttribute('hotkey', this.kbLayoutSymbols['remove']);
    randomizeBtn.setAttribute('hotkey', this.kbLayoutSymbols['randomize']);
    selectAllBtn.setAttribute('hotkey', this.kbLayoutSymbols['selectAll']);
})();



// Settings default events.
(function() {

    let playBtn = document.getElementById('play-btn')
    let addBtn = document.getElementById('add-btn');
    let removeBtn = document.getElementById('remove-btn');
    let randomizeBtn = document.getElementById('randomize-btn');
    let selectAllBtn = document.getElementById('select-all-btn');
    let backBtn = document.getElementById('back-btn');
    let shiftLeftBtn = document.getElementById('shift-left-btn');
    let shiftRightBtn = document.getElementById('shift-right-btn');
    let acceptHint = document.getElementById('accept-hint');

    let pickedCardsCounter = document.getElementById('picked-cards-counter');

    // TODO: add events.
    // NOTE: Replace assign().
    backBtn.addEventListener(
        'click',
        (e) => location.assign('index.html')
    );

    playBtn.addEventListener(
        'click',
        (e) => location.assign('in-game.html')
    );

    addBtn.addEventListener(
        'click',
        (e) => {
            let areChanged = changeMatchingCards(
                this.curPos.absolute,
                (index) => this.availableCards[index] !== this.cardBack
            );

            if (areChanged) {
                pickedCardsCounter.innerText = Number.parseInt(pickedCardsCounter.innerText) + 1;
            }
        }
    );

    removeBtn.addEventListener(
        'click',
        (e) => {
            let areChanged = changeMatchingCards(
                this.curPos.absolute,
                (index) => this.pickedCards[index] !== this.cardBack
            );

            if (areChanged) {
                pickedCardsCounter.innerText = Number.parseInt(pickedCardsCounter.innerText) - 1;
            }
        }
    );

    selectAllBtn.addEventListener(
        'click',
        (e) => exchangeDecks(this.curPos.absolute)
    );

    shiftLeftBtn.addEventListener(
        'click',
        (event) => shiftLeft()
    );

    shiftRightBtn.addEventListener(
        'click',
        (event) => shiftRight()
    );

    acceptHint.addEventListener(
        'click',
        (e) => {
            let hint = document.getElementById('on-load-hint');
            hint.style.display = 'none';
        }
    );
})();



// Placing fixed amount of cards according screen width.
(function() {

    let width = document.documentElement.clientWidth;
    let dummyCardsAmount = screenWidthMap.getMappedValue(width);

    this.curPos = new PositionPointer(dummyCardsAmount, this.availableCards.length);

    for (var i = 0; i < dummyCardsAmount; i++) {
        placeCard(this.imgManager.dummy, this.availableCardsList, true);
        placeCard(this.imgManager.dummy, this.pickedCardsList, true);
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



function shiftRight() {

    this.curPos.shiftRight();

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
        recycleCard(this.imgManager.dummy, this.availableCardsList, true);
        recycleCard(this.imgManager.dummy, this.pickedCardsList, true);
    }
}



function shiftLeft() {

    this.curPos.shiftLeft();

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
        recycleCardReverse(this.imgManager.dummy, this.availableCardsList, true);
        recycleCardReverse(this.imgManager.dummy, this.pickedCardsList, true);
    }
}



function recycleCard(filepath, deck, isInvisible = false) {

    let li = deck.firstElementChild;
    let img = li.firstElementChild;

    deck.removeChild(li);

    img.className = 'card';
    img.setAttribute('src', filepath);

    if (isInvisible) {
        img.classList.add('card--invisible');
        li.setAttribute('invisible', '');
    } else {
        li.removeAttribute('invisible');
    }

    deck.appendChild(li);
}



function recycleCardReverse(filepath, deck, isInvisible = false) {

    let li = deck.lastElementChild;
    let img = li.firstElementChild;

    deck.removeChild(li);

    img.className = 'card';
    img.setAttribute('src', filepath);

    if (isInvisible) {
        img.classList.add('card--invisible');
        li.setAttribute('invisible', '');
    } else {
        li.removeAttribute('invisible');
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
        li.setAttribute('invisible', '');
    }

    li.appendChild(img);
    deck.appendChild(li);
}



function changeMatchingCards(index, predicate) {

    if (predicate(index)) {

        [this.availableCards[index], this.pickedCards[index]] =
            [this.pickedCards[index], this.availableCards[index]];

        let position = Math.floor(this.availableCardsList.children.length / 2);
        let li_A = this.availableCardsList.children[position];
        let li_P = this.pickedCardsList.children[position];

        let img_A = li_A.firstElementChild;
        let img_P = li_P.firstElementChild;

        li_A.appendChild(img_P);
        li_P.appendChild(img_A);

        return true;
    }

    // Returns true, if has changed.
    return false;
}



function removeCard(index) {

    if (predicate(index)) {

        [this.availableCards[index], this.pickedCards[index]] =
            [this.pickedCards[index], this.availableCards[index]];

        let position = Math.floor(this.availableCardsList.children.length / 2);
        let li_A = this.availableCardsList.children[position];
        let li_P = this.pickedCardsList.children[position];

        let img_A = li_A.firstElementChild;
        let img_P = li_P.firstElementChild;

        li_A.appendChild(img_P);
        li_P.appendChild(img_A);
    }
}



function exchangeDecks(currentIndex) {

    [this.availableCards, this.pickedCards] = [this.pickedCards, this.availableCards];

    let offset = (-1) * Math.floor(this.availableCardsList.children.length / 2);

    for (var li of this.availableCardsList.children) {

        if (!li.hasAttribute('invisible')) {
            li.firstElementChild.setAttribute(
                'src',
                this.imgManager.getFilepath(this.availableCards[currentIndex + offset])
            );
        }
        offset++;
    }

    offset = (-1) * Math.floor(this.pickedCardsList.children.length / 2);

    for (var li of this.pickedCardsList.children) {

        if (!li.hasAttribute('invisible')) {
            li.firstElementChild.setAttribute(
                'src',
                this.imgManager.getFilepath(this.pickedCards[currentIndex + offset])
            );
        }
        offset++;
    }
}



function randomizeDeck(currentIndex) {

}
