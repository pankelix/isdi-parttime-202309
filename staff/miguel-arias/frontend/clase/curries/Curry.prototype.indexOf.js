Curry.prototype.indexOf = function (element) {
    for (let i = 0; i < this.length; i++) {
        if (element === this[i])
            return i
    }
    return -1
}