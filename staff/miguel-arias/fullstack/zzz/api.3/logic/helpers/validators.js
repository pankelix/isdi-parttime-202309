const { ContentError } = require("../errors")
const { isObjectIdOrHexString } = require('mongoose')

function validateText(text, explain) {
    if (typeof text !== 'string') throw new TypeError(explain + ' is not string')
    if (!text.trim().length) throw new ContentError(explain + ' is empty')
}

function validateNumber(number, explain) {
    if (typeof number !== 'number') throw new TypeError(`${explain} is not a number`)
}

function validateFunction(funktion, explain) {
    if (typeof funktion !== 'function') throw new TypeError(`${explain} is not a function`)
}

function validateId(id, explain) {
    if (!isObjectIdOrHexString(id)) throw new ContentError(`${explain} is not a valid id`)
}

module.exports = {
    validateText,
    validateNumber,
    validateFunction,
    validateId
}