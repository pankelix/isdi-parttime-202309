const { validateFunction, validateId } = require('./helpers/validators')

const { User } = require('../data/models')
const { SystemError, NotFoundError } = require('./errors')

function retrieveUser(userId, callback) {
    validateId(userId, 'user id')
    validateFunction(callback, 'callback')

    User.findById(userId, 'name').lean() //en el findById le digo que me busque por userId pero que me devuelva solo name (y el _id, que siempre lo devuelve)
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))

                return
            }

            delete user._id

            callback(null, user) //al haber usado el lean y borrado user._id, el user es un objeto que envuelve el nombre
        })
        .catch(error => callback(new SystemError(error.message)))
}

module.exports = retrieveUser