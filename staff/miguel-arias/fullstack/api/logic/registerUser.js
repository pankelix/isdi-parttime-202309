import bcrypt from 'bcryptjs'

import { User } from '../data/models.js'
import { validate, errors } from 'com'
const { DuplicityError, SystemError } = errors

function registerUser(name, email, password) {
    validate.text(name, 'name')
    validate.email(email)
    validate.password(password)

    return (async () => {
        try {
            const hash = await bcrypt.hash(password, 2)

            await User.create({ name, email, password: hash })
        } catch (error) {
            if (error.code === 11000)
                throw new DuplicityError('user already exists')

            throw new SystemError(error.mesage)
        }
    })()
}

export default registerUser