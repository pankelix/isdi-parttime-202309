Curry.prototype.concat = function (curry) {
    var newCurry = []

    for (var i = 0; i < curry1.length; i++) {
        newCurry[newCurry.length] = curry1[i]
    }

    for (var i = 0; i < curry.length; i++) {
        newCurry[newCurry.length] = curry[i]
    }

    return newCurry
}