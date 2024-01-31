import { ContentError } from '../errors'
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const ID_REGEX = /^[0-9A-Fa-f]{24}$/

function text(text, explain = 'text') {
    if (typeof text !== 'string') throw new TypeError(explain + ' is not valid')
    if (!text.trim().length) throw new ContentError(explain + ' is empty')
}

function email(email, explain = 'email') {
    text(email, explain)

    if (!EMAIL_REGEX.test(email)) throw new ContentError(`${explain} is not valid`)
}

function number(number, explain = 'number') {
    if (typeof number !== 'number') throw new TypeError(`${explain} is not valid`)
}

function funktion(funktion, explain = 'function') {
    if (typeof funktion !== 'function') throw new TypeError(`${explain} is not a function`)
}

function id(id, explain = 'id') {
    text(id, explain)

    if (!ID_REGEX.test(id)) throw new ContentError(`${explain} is not valid`)
}

function password(password, explain = 'password') {
    text(password, explain)

    if (password.length < 8) throw new RangeError(`${explain} length is lower than 8 characters`)
}

const validate = {
    text,
    email,
    number,
    function: funktion,
    id,
    password,
}

export default validate