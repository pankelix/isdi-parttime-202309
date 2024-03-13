import { validate, errors } from 'com'
const { SystemError, NotFoundError, PermissionError } = errors

import { Task, Profile } from '../data/models.js'
debugger
function assignTask(sessionProfileId, taskId, profileId) {
    validate.id(sessionProfileId, 'session profile id')
    validate.id(taskId, 'task id')

    if (profileId !== null)
        validate.id(profileId, 'profile id')

    return (async () => {
        let task
        try {
            task = await Task.findById(taskId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!task)
            throw new NotFoundError('task not found')

        let assignToSelf = false
        if (profileId === null)
            assignToSelf = true

        let profile

        if (profileId === null) {
            try {
                profile = await Profile.findById(sessionProfileId).lean()
            } catch (error) {
                throw new SystemError(error.message)
            }

            if (!profile)
                throw new NotFoundError('session profile not found')
            debugger
            if (profile.role !== 'admin'/*  && assignToSelf !== true */)
                throw new PermissionError('profile is not admin')

        } else if (profileId) {
            try {
                profile = await Profile.findById(profileId).lean()
            } catch (error) {
                throw new SystemError(error.message)
            }

            if (!profile)
                throw new NotFoundError('profile not found')
        }

        task.assignee = profile._id.toString()

        try {
            await task.save()
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}

export default assignTask