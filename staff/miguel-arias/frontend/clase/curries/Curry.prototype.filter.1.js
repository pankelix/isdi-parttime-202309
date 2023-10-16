Curry.prototype.filter = function (callback) {
    if (typeof callback === 'function') {
        filteredArray = []
        for (var i = 0; i < c.length; i++) {
            if (callback(c[i]))
                filteredArray[filteredArray.length] = c[i]
        }
        return filteredArray
    }

    if (typeof callback === 'undefined')
        throw new TypeError('undefined is not a function')
}