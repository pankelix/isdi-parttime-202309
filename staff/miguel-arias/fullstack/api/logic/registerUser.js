import bcrypt from 'bcryptjs'

import { User } from '../data/models.js'
import { validate, errors } from 'com'
const { DuplicityError, SystemError } = errors

function registerUser(name, email, password) {
    validate.text(name, 'name')
    validate.email(email)
    validate.password(password)

    return bcrypt.hash(password, 2)
        .catch(error => { throw new SystemError(error.mesage) })
        .then(hash => {
            return User.create({ name, email, password: hash }) // guardar el hash en la propiedad password de este nuevo user
                .catch(error => {
                    if (error.code === 11000) {
                        throw new DuplicityError('user already exists')
                    }

                    throw new SystemError(error.message)
                })
                .then(user => { })
        })
}

export default registerUser