function validateText(text, explain) {
    if (typeof text !== 'string') throw new TypeError(explain + ' is not string')
    if (!text.trim().length) throw new Error(explain + ' is empty')
}

function validateNumber(number, explain) {
    if (typeof number !== 'number') throw new TypeError(`${explain} is not a number`)
}

export {
    validateText,
    validateNumber
}