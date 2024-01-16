const { User } = require ("../data/models")
const { ContentError, NotFoundError, CredentialsError, SystemError } = require ("./errors")
const { validateId, validateText, validateFunction } = require ("./helpers/validators")

function changeUserPassword(userId, password, newPassword, newPasswordConfirm, callback) {
    validateId(userId, 'user id')
    validateText(password, 'password')
    validateText(newPassword, 'new password')
    validateText(newPasswordConfirm, 'new password confirmation')
    validateFunction(callback, 'callback')

    if (newPassword !== newPasswordConfirm) {
        callback(new ContentError('new password and its confirmation do not match'))

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

            user.password = newPassword
            user.save()

            callback(null)
        })
        .catch(error => callback(new SystemError(error.message)))
}

module.export = changeUserPassword