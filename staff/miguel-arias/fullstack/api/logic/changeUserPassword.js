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

    return (async () => {
        let user
        try {
            user = await User.findById(userId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user)
            throw new NotFoundError('user not found')

        let match
        try {
            match = await bcrypt.compare(password, user.password)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!match)
            throw new CredentialsError('wrong password')

        let hash
        try {
            hash = await bcrypt.hash(newPassword, 2)
        } catch (error) {
            throw new SystemError(error.message)
        }

        user.password = hash

        try {
            await user.save()
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}

export default changeUserPassword