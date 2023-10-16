Curry.prototype.pop = function () {
    if (c.length > 0) {
        var deletedElement = ''

        deletedElement = c[c.length - 1]
        delete c[c.length - 1]
        c.length--
        return deletedElement
    } else {
        return undefined
    }
}