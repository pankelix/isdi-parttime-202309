import { User } from '../data/models.js'
import validate from './helpers/validate.js'
import { SystemError, NotFoundError, CredentialsError } from './errors.js'

function authenticateUser(email, password, callback) {
    validate.email(email)
    validate.password(password)
    validate.function(callback, 'callback')

    User.findOne({ email })
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))

                return
            }

            if (user.password !== password) {
                callback(new CredentialsError('wrong password'))

                return
            }

            callback(null, user.id)
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default authenticateUser