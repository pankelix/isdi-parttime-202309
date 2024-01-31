import { User } from '../data/models.js'
import validate from './helpers/validate.js'
import { ContentError, NotFoundError, CredentialsError, SystemError } from './errors.js'

function changeUserPassword(userId, password, newPassword, newPasswordConfirm) {
    validate.id(userId, 'user id')
    validate.password(password)
    validate.password(newPassword, 'new password')
    validate.password(newPasswordConfirm, 'new password confirmation')

    if (newPassword !== newPasswordConfirm)
        throw new ContentError('new password and its confirmation do not match')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            if (user.password !== password)
                throw new CredentialsError('wrong password')

            user.password = newPassword

            return user.save()
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
        })
}

export default changeUserPassword