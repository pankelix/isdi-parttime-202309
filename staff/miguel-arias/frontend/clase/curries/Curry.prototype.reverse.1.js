Curry.prototype.reverse = function () {
    for (var i = 0; i < this.length/2; i++) {
        var forwardElement = this[i]
        var backwardElement = this[this.length -1 -i]
        this[this.length -1 -i] = forwardElement
        this[i] = backwardElement
    }

    return this
}