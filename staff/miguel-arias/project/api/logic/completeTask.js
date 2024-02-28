import bcrypt from 'bcryptjs'

import { validate, errors } from 'com'
const { SystemError, NotFoundError, CredentialsError } = errors

import { Profile, Task } from '../data/models.js'

function completeTask(profileId, taskId, pincode, date) {
    validate.id(profileId, 'profile id')
    validate.id(taskId, 'task id')
    validate.pincode(pincode)

    return (async () => {
        let profile
        try {
            profile = await Profile.findById(profileId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!profile)
            throw new NotFoundError('profile not found')

        if (!profile.role !== 'admin')
            throw new CredentialsError('this profile is not admin')

        let match
        try {
            match = await bcrypt.compare(pincode, profile.pincode)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!match)
            throw new CredentialsError('pincode not correct')

        let task
        try {
            task = await Task.findById(taskId).populate('template')
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!task)
            throw new NotFoundError('task not found')

        const newDate = date.getDate() + task.template.periodicity + 1

        task.date = date.setDate(newDate)

        profile.points += task.template.points

        try {
            await task.save()
            await profile.save()
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}

export default completeTask