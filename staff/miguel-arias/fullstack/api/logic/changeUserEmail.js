import { User } from '../data/models.js'
import validate from './helpers/validate.js'
import { NotFoundError, CredentialsError, ContentError, SystemError } from './errors.js'

function changeUserEmail(userId, newEmail, newEmailConfirm, password) {
    validate.id(userId, 'user id')
    validate.email(newEmail, 'new email')
    validate.email(newEmailConfirm, 'new email confirmation')
    validate.password(password)

    if (newEmail !== newEmailConfirm)
        throw new ContentError('new email and its confirmation do not match')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            if (user.password !== password)
                throw new CredentialsError('wrong password')

            user.email = newEmail

            return user.save()
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
        })
}

export default changeUserEmail