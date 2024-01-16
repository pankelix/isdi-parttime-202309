const { validateText, validateFunction } = require('../utils/validate')
const JSON = require('../utils/JSON')

function retrieveUser(userId, callback) {
    validateText(userId, 'user id')
    validateFunction(callback, 'callback')

    JSON.parseFromFile('./data/users.json', (error, users) => {
        if (error) {
            callback(error)

            return
        }

        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error('user not found'))

            return
        }

        delete user.id
        delete user.email
        delete user.password
        delete user.favs

        callback(null, user)
    })
}

module.exports = retrieveUser