Curry.prototype.forEach = function (callback) {
    for (var i = 0; i < c.length; i++) {
        var element = c[i]

        callback(element)
    }
}