const { User } = require("../data/models")
const validate = require("./helpers/validate")
const { ContentError, NotFoundError, CredentialsError, SystemError } = require("./errors")

function changeUserPassword(userId, password, newPassword, newPasswordConfirm, callback) {
    validate.id(userId, 'user id')
    validate.password(password)
    validate.password(newPassword, 'new password')
    validate.password(newPasswordConfirm, 'new password confirmation')
    validate.function(callback, 'callback')

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

module.exports = changeUserPassword