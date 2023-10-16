Curry.prototype.map = function (callback) {
    switch (typeof callback) {
        case 'function':
            mappedArray = []
            for (var i = 0; i < c.length; i++)
                mappedArray[i] = callback(c[i])

            return mappedArray
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