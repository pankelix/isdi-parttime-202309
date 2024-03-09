import { validate, errors } from 'com'
const { SystemError, NotFoundError } = errors

import { Home, Profile } from '../data/models.js'
debugger
function changeAvatar(homeId, profileId, image) {
    validate.id(homeId, 'home id')
    validate.id(profileId, 'profile id')

    return (async () => {
        let home
        try {
            home = await Home.findById(homeId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!home)
            throw new NotFoundError('home not found')

        let profile
        try {
            profile = await Profile.findById(profileId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!profile)
            throw new NotFoundError('profile not found')

        profile.avatar = {
            data: image.file.buffer,
            contentType: image.file.mimetype
        }

        try {
            await profile.save()
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}

export default changeAvatar