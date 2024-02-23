import { validate, errors } from 'com'
const { SystemError, NotFoundError } = errors

import { Home, Profile } from '../data/models.js'

function retrieveProfiles(homeId) {
    validate.id(homeId)

    return (async () => {
        let home
        try {
            home = await Home.findById(homeId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!home)
            throw new NotFoundError('home not found')

        let profiles
        try {
            profiles = await Profile.find({ home: homeId }).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!profiles)
            throw new NotFoundError('profile not found')

        delete profiles.id

        return profiles
    })()
}

export default retrieveProfiles