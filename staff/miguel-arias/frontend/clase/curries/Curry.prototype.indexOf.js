Curry.prototype.indexOf = function (element) {
    for (var i = 0; i < c.length; i++) {
        if (element === c[i])
            return i
    }
    return -1
}