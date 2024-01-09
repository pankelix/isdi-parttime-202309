const { User } = require("../data/models")
const { NotFoundError, CredentialsError, ContentError, SystemError } = require("./errors")
const { validateText, validateFunction, validateId } = require("./helpers/validators")


function changeUserEmail(userId, newEmail, newEmailConfirm, password, callback) {
    validateText(newEmail, 'new email')
    validateText(newEmailConfirm, 'new email confirmation')
    validateText(password, 'password')
    validateId(userId, 'user id')
    validateFunction(callback, 'callback')

    if (newEmail !== newEmailConfirm) {
        callback(new ContentError('new email and its confirmation do not match'))

        return
    }

    User.findById(userId)
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))

                return
            }

            if (user.password !== password) {
                callback(new CredentialsError('wrong password'))

                return
            }

            user.email = newEmail
            user.save()

            callback(null)

        })
        .catch(error => callback(new SystemError(error.message)))
}

module.exports = changeUserEmail