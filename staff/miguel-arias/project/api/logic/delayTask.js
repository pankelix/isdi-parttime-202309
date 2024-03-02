import { validate, errors } from 'com'
const { SystemError, NotFoundError } = errors

import { Task, Profile } from '../data/models.js'

function delayTask(profileId, taskId, date) {
    validate.id(profileId, 'profile id')
    validate.id(taskId, 'task id')

    return (async () => {
        let profile
        try {
            profile = await Profile.findById(profileId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!profile)
            throw new NotFoundError('profile not found')

        let task
        try {
            task = await Task.findById(taskId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!task)
            throw new NotFoundError('task not found')

        task.date = date

        try {
            await task.save()
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}

export default delayTask