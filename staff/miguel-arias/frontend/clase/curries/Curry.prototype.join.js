Curry.prototype.join = function (separator) {
    joinedString = ''

    if (separator === undefined)
        separator = ','

    if (this.length === 0)
        return ''

    if (this.length === 1)
        return this.toString()

    for (let i = 0; i < this.length; i++) {
        joinedString += this[i]

        if (i < this.length - 1)
            joinedString += separator
    }
    return joinedString
}