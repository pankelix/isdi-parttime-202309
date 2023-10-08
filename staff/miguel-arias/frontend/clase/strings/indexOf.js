function indexOf(string, searchString) {
    for (let i = 0; i < string.length; i++) {
        if (string[i] === searchString) {
            return i
        }
    }

    return -1
}