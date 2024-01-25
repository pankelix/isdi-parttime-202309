import { User } from '../data/models.js'
import validate from './helpers/validate.js'
import { NotFoundError, CredentialsError, ContentError, SystemError } from './errors.js'

function changeUserEmail(userId, newEmail, newEmailConfirm, password, callback) {
    validate.id(userId, 'user id')
    validate.email(newEmail, 'new email')
    validate.email(newEmailConfirm, 'new email confirmation')
    validate.password(password)
    validate.function(callback, 'callback')

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

export default changeUserEmail