import { User } from '../data/models.js'
import validate from './helpers/validate.js'
import { SystemError, NotFoundError, CredentialsError } from './errors.js'

function authenticateUser(email, password) {
    validate.email(email)
    validate.password(password)

    return User.findOne({ email })
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            if (user.password !== password)
                throw new CredentialsError('wrong password')

            return user.id
        })
}

export default authenticateUser