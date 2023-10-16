Curry.prototype.splice = function (start, deleteCount) {
    if (arguments.length === 1) {
        deletedElements = []

        for (var i = start; i < c.length; i++) {
            deletedElements[deletedElements.length] = c[i]
            delete c[i]
        }

        c.length = c.length - deletedElements.length
        return deletedElements

    } else if (arguments.length === 2) {
        deletedElements = []

        for (var i = start; i < c.length; i++) {
            deletedElements[deletedElements.length] = c[i]
            delete c[i]
        }
        
        c.length = c.length - deletedElements.length
        return deletedElements
    }
}