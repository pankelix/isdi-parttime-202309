Curry.prototype.pop = function () {
    if (this.length > 0) {
        let deletedElement = ''

        deletedElement = this[this.length - 1]
        delete this[this.length - 1]
        this.length--
        return deletedElement

    } else {
        return undefined
    }
}