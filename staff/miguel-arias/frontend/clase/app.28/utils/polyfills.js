if (typeof Array.prototype.forEachReverse === 'undefined')
    Array.prototype.forEachReverse = function (callback) {
        for (var i = this.length - 1; i > -1; i--)
            callback(this[i], i, this)
    }