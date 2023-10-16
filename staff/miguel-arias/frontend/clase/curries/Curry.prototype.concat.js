Curry.prototype.concat = function (curry1, curry2) {
    newCurry = new Curry ()
    for (var i = 0; i < curry1.length; i++) {
        newCurry[newCurry.length] = curry1[i]
    }
    for (var i = 0; i < curry2.length; i++) {
        newCurry[newCurry.length] = curry2[i]
    }
    
    return newCurry
}