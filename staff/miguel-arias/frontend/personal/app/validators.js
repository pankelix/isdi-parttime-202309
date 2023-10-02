function validateText(text, explain) {
    if (typeof text !== 'string') throw new TypeError(explain + ' is not string')
    if (!text.trim().length) throw new Error(explain + ' is empty')
}

function validatePasswordsMatch(password, confirmPassword) {
    if (password !== confirmPassword) {
        throw new Error('passwords do not match')
    }
}