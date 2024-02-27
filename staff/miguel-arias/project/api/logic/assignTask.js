import { validate, errors } from 'com'
const { SystemError, NotFoundError } = errors

import { Task, Profile } from '../data/models.js'

function assignTask(taskId, profileId) {
    validate.id(taskId, 'task id')
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

        let profile
        try {
            profile = await Profile.findById(profileId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!profile)
            throw new NotFoundError('profile not found')

        task.assignee = profileId

        try {
            await task.save()
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}

export default assignTask