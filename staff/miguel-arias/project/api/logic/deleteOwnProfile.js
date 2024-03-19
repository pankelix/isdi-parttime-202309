import { Profile, Task } from '../data/models.js'
import { validate, errors } from 'com'
const { SystemError, NotFoundError, PermissionError } = errors

function deleteOwnProfile(profileId) {
    validate.id(profileId, 'profile id')

    return (async () => {

        let profile
        try {
            profile = await Profile.findById(profileId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!profile)
            throw new NotFoundError('profile not found')

        try {
            await Task.updateMany({ assignee: profileId }, { $unset: { assignee: 1 } })
        } catch (error) {
            throw new SystemError(error.message)
        }

        try {
            profile = await Profile.findByIdAndDelete(profileId)
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}

export default deleteOwnProfile