Curry.prototype.filter = function (callback) {
    if (typeof callback !== 'function')
        throw new TypeError(typeof callback + ' ' + callback + ' is not a function')

    const filteredCurry = new Curry
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i])) {
            filteredCurry[filteredCurry.length] = this[i]
            filteredCurry.length++
        }
    }

    return filteredCurry
}