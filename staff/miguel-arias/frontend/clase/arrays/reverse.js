function reverse(array) {
    for (var i = 0; i < Math.floor(array.length / 2); i++) {
        var forwardElement = array[i]
        array[i] = array[array.length - 1 - i]
        array[array.length - 1 - i] = forwardElement
    }

    return array
}