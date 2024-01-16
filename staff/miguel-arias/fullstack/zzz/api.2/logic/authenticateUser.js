const JSON = require('../utils/JSON')
const { SystemError, NotFoundError, ContentError } = require('../utils/errors')
const { validateText, validateFunction } = require('../utils/validate')

function authenticateUser(email, password, callback) {
    validateText(email, 'email')
    validateText(password, 'password')
    validateFunction(callback, 'callback')

    JSON.parseFromFile('./data/users.json', (error, users) => {
        if (error) {
            callback(new SystemError(error.message))

            return
        }

        let user = users.find(user => user.email === email)

        if (!user) {
            callback(new NotFoundError('user not found'))

            return
        }

        if (user.password !== password) {
            callback(new ContentError('wrong credentials'))

            return
        }

        callback(null, user.id)
    })
}

module.export = authenticateUser