Curry.prototype.at = function (index) {
    if (index >= c.length || index + c.length < 0)
        return undefined

    if (index === true) {
        element = c[1]
        return element
    } else if (index === false || typeof index === 'string' || typeof index === 'object' || typeof index === 'undefined') {
        element = c[0]
        return element
    }

    if (Number.isInteger(index)) {
        if (index < 0) {
            element = c.length - index
            return element
        }
    }

    if (!Number.isInteger(index)) {
        if (index > 0) {
            index = '' + index + ''
            element = index[0]
            element = Number(element)
            element = c[element]
            return element
        } else {
            index = '' + index + ''
            element = index[0] + index[1]
            element = Number(element)
            element = c[element + c.length]
            return element
        }
    }

    element = c[index]
    return element
}