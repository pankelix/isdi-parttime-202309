Curry.prototype.reverse = function () {
    for (var i = 0; i < Math.floor(this.length / 2); i++) {
        var forwardElement = this[i]
        this[i] = this[this.length - 1 - i]
        this[this.length - 1 - i] = forwardElement
    }

    return this
}