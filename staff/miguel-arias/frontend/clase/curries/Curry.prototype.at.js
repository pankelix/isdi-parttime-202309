Curry.prototype.at = function (index) {
    if (index >= this.length || index + this.length < 0)
        return undefined

    if (index === true) {
        element = this[1]
        return element
    } else if (index === false || typeof index === 'string' || typeof index === 'object' || typeof index === 'undefined') {
        element = this[0]
        return element
    }

    if (Number.isInteger(index)) {
        if (index < 0) {
            element = this.length - index
            return element
        }
    }

    if (!Number.isInteger(index)) {
        if (index > 0) {
            index = '' + index + ''
            element = index[0]
            element = Number(element)
            element = this[element]
            return element
        } else {
            index = '' + index + ''
            element = index[0] + index[1]
            element = Number(element)
            element = this[element + this.length]
            return element
        }
    }

    element = this[index]
    return element
}