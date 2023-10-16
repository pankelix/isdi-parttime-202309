Curry.prototype.push = function (item) {
    if (!arguments.length) //si no hay items
        return this.length

    this[this.length] = item
    this.length++

    if (arguments.length > 1)
        for (var i = 1; i < arguments.length; i++) {
            this[this.length] = arguments[i]
            this.length++
        }

    return this.length
}