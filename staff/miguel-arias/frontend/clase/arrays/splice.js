function splice(array, start, removeCount, item) {
    if (removeCount === 0) {
        var displacement = arguments.length - 3

        for (var i = array.length - 1; i >= start; i--) {
            var element = array[i]

            array[i + displacement] = element
        }

        array[start] = item

        for (var i = 4; i < arguments.length; i++) {
            var element = arguments[i]

            array[start + i - 3] = element
        }

        return []
    } else if (removeCount === 1 && arguments.length === 4) {
        var elementToRemove = array[start]

        array[start] = item

        return [elementToRemove]
    } else if (removeCount >= 1) {
        var removed = []

        for (var i = start; i < array.length - 1; i++) {
            var elementToRemove = array[i]

            removed[removed.length] = elementToRemove

            var next = array[i + removeCount]

            array[i] = next
        }

        array.length -= removeCount

        return removed
    }
}