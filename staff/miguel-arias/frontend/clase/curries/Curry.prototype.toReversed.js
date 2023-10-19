Curry.prototype.toReversed = function () {
    toReversedCurry = new Curry()

    for (i = this.length - 1; i > -1; i--) {
        toReversedCurry[this.length - 1 - i] = this[i]
        toReversedCurry.length++
    }

    return toReversedCurry
}