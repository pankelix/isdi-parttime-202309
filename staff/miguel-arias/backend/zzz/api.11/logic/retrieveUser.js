const { validateFunction, validateId } = require('./helpers/validators')

const { User } = require('../data/models')
const { SystemError, NotFoundError } = require('./errors')

function retrieveUser(userId, callback) {
    validateId(userId, 'user id')
    validateFunction(callback, 'callback')

    User.findById(userId)
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))

                return
            }

            callback(null, { name: user.name })
        })
        .catch(error => callback(new SystemError(error.message)))
}

module.exports = retrieveUser