function Curry() {
    if (arguments.length === 1)
        if (Number.isInteger(arguments[0]) && arguments[0] >= 0) {
            this.length = arguments[0]

            return
        } else if (Number.isInteger(arguments[0]) && arguments[0] < 0 || typeof arguments[0] === 'number' && !Number.isInteger(arguments[0]))
            throw new RangeError('Invalid curry length')


    for (var i = 0; i < arguments.length; i++) {
        var argument = arguments[i]

        this[i] = argument
    }

    this.length = arguments.length
}