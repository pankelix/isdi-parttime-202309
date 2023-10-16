function Curry() {
    if (arguments.length === 1 && Number.isInteger(arguments[0]) && arguments[0] >= 0) {
        this.length = arguments[0]
    } else if (arguments.length === 1 && Number.isInteger(arguments[0]) && arguments[0] < 0) {
        throw new RangeError('Invalid curry length')
    } else {
        for (var i = 0; i < arguments.length; i++) {
            var argument = arguments[i]

            this[i] = argument
        }

        this.length = arguments.length
    }
}