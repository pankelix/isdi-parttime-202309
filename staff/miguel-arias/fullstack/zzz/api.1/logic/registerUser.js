const JSON = require('../utils/JSON')
const generateId = require('../data/generateId')
const { validateText, validateFunction } = require('../utils/validate')
const { DuplicityError, SystemError } = require('../utils/errors')

function registerUser(name, email, password, callback) {
    validateText(name, 'name')
    validateText(email, 'email')
    validateText(password, 'password')
    validateFunction(callback, 'callback')

    JSON.parseFromFile('./data/users.json', (error, users) => {
        if (error) {
            callback(new SystemError(error.message))

            return
        }

        let user = users.find(user => user.email === email)

        if (user) {
            callback(new DuplicityError('user already exists'))

            return
        }

        user = {
            id: generateId(),
            name,
            email,
            password,
            favs: []
        }

        users.push(user)

        JSON.stringifyToFile('./data/users.json', users, error => {
            if (error) {
                callback(new SystemError(error.message))

                return
            }

            callback(null)
        })
    })
}

module.exports = registerUser