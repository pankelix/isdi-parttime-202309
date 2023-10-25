Curry.prototype.concat = function (curry1, curry2) {
    const newCurry = new Curry()
        for (let i = 0; i < this.length; i++) {
            newCurry[newCurry.length] = this[i]
            newCurry.length++
        }

        for (let i = 0; i < curries.length; i++) {
            for (let j = 0; j < curries[i].length; j++) {
                newCurry[newCurry.length] = curries[i][j]
                newCurry.length++
            }
        }

        return newCurry
}