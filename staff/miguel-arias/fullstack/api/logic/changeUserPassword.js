import bcrypt from 'bcryptjs'

import { User } from '../data/models.js'
import { validate, errors } from 'com'
const { ContentError, NotFoundError, CredentialsError, SystemError } = errors

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

            return bcrypt.compare(password, user.password)
                .catch(error => { throw new SystemError(error.message) })
                .then(match => {
                    if (!match)
                        throw new CredentialsError('wrong password')

                    return bcrypt.hash(newPassword, 2)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(hash => {
                            user.password = hash

                            return user.save()
                                .catch(error => { throw new SystemError(error.message) })
                                .then(() => { })
                        })
                })
        })
}

export default changeUserPassword