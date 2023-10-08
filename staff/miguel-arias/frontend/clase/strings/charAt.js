function charAt(string, index) {
    if (index < 0 || index >= string.length)
        return ''

    return string[index]
}