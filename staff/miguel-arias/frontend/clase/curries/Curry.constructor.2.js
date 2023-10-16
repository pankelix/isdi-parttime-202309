function Curry() {
    if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++) {
            var arguments = arguments[i]

            this[i] = argument
        }

        this.length = arguments.length
    } else if (argument.length === 1) {
        var argument = arguments[0]

        if (Number.isInteger(argument)) {
            this.length = argument
        }
    }
}