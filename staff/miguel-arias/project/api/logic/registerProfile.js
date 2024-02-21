import bcrypt from 'bcryptjs'

import { validate, errors } from 'com'
const { SystemError, DuplicityError } = errors

import { Profile } from '../data/models.js'

function registerProfile(name, pincode, color, role ) {
    validate.text(name, 'name')
    validate.pincode(pincode, 'pincode')

    return (async () => {
        try {
            const hash = await bcrypt.hash(pincode, 8)

            const profile = await Profile.create({ name, pincode: hash, color, role })

            return profile
        } catch (error) {
            if (error.code === 11000)
                throw new DuplicityError('home already exists')

            throw new SystemError(error.message)
        }
    })()
}

export default registerProfile