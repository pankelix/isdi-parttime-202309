Curry.prototype.at = function (index) {
    if (index >= c.length || index + c.length < 0)
        return undefined

    if (index < 0) {
        element = c.length - index
        return element
    }

    if (!Number.isInteger(index)) {
        index = '' + index + ''
        element = index[0]
        Number(element)
        element = c[element]
        return element
    }

    element = c[index]
    return element
}