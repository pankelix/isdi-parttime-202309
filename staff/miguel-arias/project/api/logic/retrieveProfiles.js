import { validate, errors } from 'com'
const { SystemError, NotFoundError } = errors

import { Home, Profile } from '../data/models.js'

function retrieveProfiles(homeId) {
    validate.id(homeId)

    return (async () => {
        debugger
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
            profiles = await Profile.find({ home: homeId }).select('-__v').lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!profiles)
            throw new NotFoundError('profile not found')

        profiles.forEach(profile => {
            profile.id = profile._id.toString()
            delete profile._id

            /* if (profile.home._id) {
                profile.home.id = profile.home._id.toString()
                delete profile.home._id
            } */
        })

        return profiles
    })()
}

export default retrieveProfiles