import { Profile, Room, Template } from '../data/models.js'
import { validate, errors } from 'com'
const { SystemError, NotFoundError, PermissionError } = errors

function deleteRoom(profileId, roomId) {
    validate.id(profileId, 'profile id')
    validate.id(roomId, 'room id')

    return (async () => {
        let profile
        try {
            profile = await Profile.findById(profileId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!profile)
            throw new NotFoundError('profile not found')

        if (profile.role !== 'admin')
            throw new PermissionError('profile is not admin')

        let room
        try {
            room = await Room.findById(roomId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!room)
            throw new NotFoundError('room not found')

        try {
            await Template.updateMany({ rooms: roomId }, { $pull: { rooms: roomId } })
        } catch (error) {
            throw new SystemError(error.message)
        }

        try {
            room = await Room.findByIdAndDelete(roomId)
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}

export default deleteRoom