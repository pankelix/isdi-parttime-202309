Curry.prototype.splice = function (start, deleteCount) {
    deletedElements = new Curry
    if (arguments.length === 1) {
        for (let i = start; i < this.length; i++) {
            deletedElements[deletedElements.length] = this[i]
            delete this[i]
            deletedElements.length++
        }

        this.length = this.length - deletedElements.length
        return deletedElements

    } else if (arguments.length === 2) {
        for (let i = start; i < this.length; i++) {
            if (i === start + deleteCount - 1) {
                deletedElements[deletedElements.length] = this[i]
                delete this[i]
                deletedElements.length++
            }
        }

        return deletedElements
    }
}