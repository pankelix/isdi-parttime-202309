function splice(array, start, removeCount, item) {
    if (removeCount === 1) {
        var elementToRemove = array[start]
        array[start] = item
        return [elementToRemove]

    } else if (removeCount === 0) {
        for (var i = array.length - 1; i >= start; i--) {
            var element = array[i]
            array[i + 1] = element
        }

        array[start] = item
        return []
    }
}