import { User } from '../data/models.js'
import { validate, errors } from 'com'
const { DuplicityError, SystemError } = errors

function registerUser(name, email, password) {
    validate.text(name, 'name')
    validate.email(email)
    validate.password(password)

    return User.create({ name, email, password })
        .catch(error => {
            if (error.code === 11000) {
                throw new DuplicityError('user already exists')
            }

            throw new SystemError(error.message)
        })
        .then(user => { })
}

export default registerUser