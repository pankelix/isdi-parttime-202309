Curry.prototype.join = function (separator) {
    joinedString = ''

    if (separator === undefined)
        separator = ','

    if (c.length === 0)
        return ''

    if (c.length === 1)
        return c.toString()

    for (var i = 0; i < c.length; i++) {
        joinedString += c[i]
        
        if (i < c.length - 1)
            joinedString += separator
    }
    return joinedString
}