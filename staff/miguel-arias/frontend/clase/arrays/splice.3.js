function splice(array, start, removeCount, item) {
    if (removeCount === 1) {
        var elementToRemove = array[start]
        array[start] = item
        return [elementToRemove]

    } else if (removeCount === 0) {
        if (arguments.length === 4) {
            for (var i = array.length - 1; i >= start; i--) {
                var element = array[i]
                array[i + 1] = element
            }

            array[start] = item
            return []
        } else if (arguments.length > 4) {
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
        }
    }
}