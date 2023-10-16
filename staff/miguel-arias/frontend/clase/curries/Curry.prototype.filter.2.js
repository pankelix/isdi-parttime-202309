Curry.prototype.filter = function (callback) {
    switch (typeof callback) {
        case 'function':
            var filteredCurry = new Curry
            for (var i = 0; i < this.length; i++) {
                if (callback(this[i])) {
                    filteredCurry[filteredCurry.length] = this[i]
                    filteredCurry.length++
                }
            }
            return filteredCurry
        case 'undefined':
            throw new TypeError('undefined is not a function')
        case 'string':
            throw new TypeError('string "' + callback + '" is not a function')
        case 'number':
            throw new TypeError('number ' + callback + ' is not a function');
        case 'object':
            throw new TypeError('object ' + callback + ' is not a function');
        case 'boolean':
            throw new TypeError('boolean ' + callback + ' is not a function');
        default:
    }
}