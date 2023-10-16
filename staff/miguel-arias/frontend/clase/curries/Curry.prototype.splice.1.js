Curry.prototype.splice = function (start) {
    splicedArray = []
    for (var i= start; i < c.length; i++) {
        splicedArray[splicedArray.length] = c[i]
    }
        c = splicedArray
        return c
}