function splice(array, start, removeCount, item) {
    var elementToRemove = array[start]

    array[start] = item

    return [elementToRemove]
}