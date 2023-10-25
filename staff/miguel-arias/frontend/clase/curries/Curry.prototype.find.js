Curry.prototype.find = function (callback) {
    switch (typeof callback) {
        case 'function':
            for (let i = 0; i < this.length; i++) {
                if (callback(this[i]))
                    return this[i]
            }
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