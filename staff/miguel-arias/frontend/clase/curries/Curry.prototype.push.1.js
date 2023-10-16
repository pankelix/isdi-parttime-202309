Curry.prototype.push = function (item) {
    this[this.length] = item
    this.length++

    return this.length
}