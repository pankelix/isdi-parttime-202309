import bcrypt from 'bcryptjs'

import { validate, errors } from 'com'
const { SystemError, DuplicityError, NotFoundError } = errors

import { Profile, Home } from '../data/models.js'
debugger

function registerProfile(homeId, name, pincode) {
    validate.id(homeId)
    validate.text(name, 'name')
    validate.pincode(pincode, 'pincode')

    return (async () => {
        let home
        try {
            home = await Home.findById(homeId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!home)
            throw new NotFoundError('home not found')

        const defaultColors = [
            { name: 'Orange', code: '#FF5733' },
            { name: 'Blue', code: '#3498DB' },
            { name: 'Emerald green', code: '#2ECC71' },
            { name: 'Yellow', code: '#F39C12' },
            { name: 'Purple', code: '#9B59B6' },
            { name: 'Red', code: '#E74C3C' },
            { name: 'Turquoise', code: '#1ABC9C' },
            { name: 'Soft yellow', code: '#F1C40F' },
            { name: 'Dark green', code: '#16A085' },
            { name: 'Dark red', code: '#C0392B' },
            { name: 'Dark blue', code: '#3498DB' },
            { name: 'Green', code: '#27AE60' },
            { name: 'Soft orange', code: '#F39C12' },
            { name: 'Dark purple', code: '#8E44AD' },
            { name: 'Soft red', code: '#E74C3C' },
            { name: 'Soft turquoise', code: '#1ABC9C' },
            { name: 'Dark yellow', code: '#F1C40F' },
            { name: 'Dark blue', code: '#2980B9' },
            { name: 'Greyish blue', code: '#2C3E50' },
            { name: 'Carrot', code: '#D35400' }
        ];

        const usedColors = await Profile.distinct('color')

        const unusedColors = defaultColors.filter(color => !usedColors.includes(color))

        try {
            const hash = await bcrypt.hash(pincode, 8)

            const profile = await Profile.create({ home: homeId, name, pincode: hash, color: unusedColors[0] })

            return profile
        } catch (error) {
            if (error.code === 11000)
                throw new DuplicityError('profile already exists')

            throw new SystemError(error.message)
        }
    })()
}

export default registerProfile