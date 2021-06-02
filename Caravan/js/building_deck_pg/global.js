screenWidthMap = {
    // FIXME: Remeasure.
    '480': 2,
    '1024': 3,

    getMappedValue(screenWidth) {

        for (const width in this) {
            if (Number.parseInt(width) >= screenWidth) {
                return this[width];
            }
        }
        return 4;
    }
};



buildingDeckPageKbLayoutSymbols = {
    add: "(E)",
    remove: "(R)",
    randomize: "(M)",
    selectAll: "(A)",
    moveLeft: "(←)",
    moveRight: "(→)"
};



availableCards = [
    '2C', '2D', '2H', '2S',
    '3C', '3D', '3H', '3S',
    '4C', '4D', '4H', '4S',
    '5C', '5D', '5H', '5S',
    '6C', '6D', '6H', '6S',
    '7C', '7D', '7H', '7S',
    '8C', '8D', '8H', '8S',
    '9C', '9D', '9H', '9S',
    '10C', '10D', '10H', '10S',
    'AC', 'AD', 'AH', 'AS',
    'JC', 'JD', 'JH', 'JS',
    'KC', 'KD', 'KH', 'KS',
    'QC', 'QD', 'QH', 'QS',
    'JKR_A', 'JKR_B'
];



pickedCards = [
    'card-back', 'card-back', 'card-back', 'card-back',
    'card-back', 'card-back', 'card-back', 'card-back',
    'card-back', 'card-back', 'card-back', 'card-back',
    'card-back', 'card-back', 'card-back', 'card-back',
    'card-back', 'card-back', 'card-back', 'card-back',
    'card-back', 'card-back', 'card-back', 'card-back',
    'card-back', 'card-back', 'card-back', 'card-back',
    'card-back', 'card-back', 'card-back', 'card-back',
    'card-back', 'card-back', 'card-back', 'card-back',
    'card-back', 'card-back', 'card-back', 'card-back',
    'card-back', 'card-back', 'card-back', 'card-back',
    'card-back', 'card-back', 'card-back', 'card-back',
    'card-back', 'card-back', 'card-back', 'card-back',
    'card-back', 'card-back'
];



class ImgManager {

    constructor() {

        this.dummy = this.getFilepath('dummy-card');
        this.cardBack = this.getFilepath('card-back');
    }

    getFilepath(filename) {

        return 'img/' + filename + '.png';
    }
};
imgManager = new ImgManager();



class PositionPointer {

    constructor(offset, length) {
        // FIXME: check amount.
        this.absolute = 0;
        this.relative = offset;

        this._offset = offset;
        this._adjustment = offset;

        // 'forward' or 'backward'.
        this._movingDir = 'forward';

        this._minAbsoluteIndex = 0;
        this._minRelativeIndex = 0;
        this._maxAbsoluteIndex = length - 1;
        this._maxRelativeIndex = length - 1;

        this.isAtLeftAbsoluteLimit = true;
        this.isAtLeftRelativeLimit = true;
        this.isAtRightAbsoluteLimit = false;
        this.isAtRightRelativeLimit = false;
    }


    shiftRight() {

        if (this._movingDir === 'forward') {
            this._movingDir = 'backward';
            this.relative -= this._offset + this._adjustment;
        }

        if (this.relative > this._minRelativeIndex) {
            this.absolute--;
            this.relative--;

            if (this._adjustment < this._offset) {
                this._adjustment++;
            }

            if (this.absolute < this._maxAbsoluteIndex && this.isAtRightAbsoluteLimit) {
                this.isAtRightAbsoluteLimit = false;
            }
            if (this.relative < this._maxRelativeIndex && this.isAtRightRelativeLimit) {
                this.isAtRightRelativeLimit = false;
            }
        } else if (this.absolute > this._minAbsoluteIndex) {
            this.absolute--;
            this._adjustment--;

            if (!this.isAtLeftRelativeLimit) {
                this.isAtLeftRelativeLimit = true;
            }
        } else {
            this.isAtLeftAbsoluteLimit = true;
        }
    }

    shiftLeft() {

        if (this._movingDir === 'backward') {
            this._movingDir = 'forward';
            this.relative += this._offset + this._adjustment;
        }

        if (this.relative < this._maxRelativeIndex) {
            this.absolute++;
            this.relative++;

            if (this._adjustment < this._offset) {
                this._adjustment++;
            }

            if (this.absolute > this._minAbsoluteIndex && this.isAtLeftAbsoluteLimit) {
                this.isAtLeftAbsoluteLimit = false;
            }
            if (this.relative > this._minRelativeIndex && this.isAtLeftRelativeLimit) {
                this.isAtLeftRelativeLimit = false;
            }
        } else if (this.absolute < this._maxAbsoluteIndex) {
            this.absolute++;
            this._adjustment--;

            if (!this.isAtRightRelativeLimit) {
                this.isAtRightRelativeLimit = true;
            }
        } else {
            this.isAtRightAbsoluteLimit = true;
        }
    }
};
