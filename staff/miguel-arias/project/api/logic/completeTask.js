import bcrypt from 'bcryptjs'

import { validate, errors } from 'com'
const { SystemError, NotFoundError, CredentialsError, PermissionError } = errors

import { Profile, Task } from '../data/models.js'
import { ContentError } from 'com/errors.js'

function completeTask(profileId, taskId, pincode, date) {
    validate.id(profileId, 'profile id')
    validate.id(taskId, 'task id')
    validate.pincode(pincode)
    validate.date(date)

    return (async () => {
        debugger
        let profile
        try {
            profile = await Profile.findById(profileId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!profile)
            throw new NotFoundError('profile not found')

        if (profile.role !== 'admin')
            throw new PermissionError('profile is not admin')

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

        if (task.done === true)
            throw new ContentError('this task is already done')

        let completionDate = new Date(date)

        /* if (completionDate < task.completionDate)
            throw new ContentError("tasks can't be completed before their due completionDate") */

        let completedTask
        try {
            completedTask = await Task.create({home: task.home._id.toString(), template: task.template._id.toString(), assignee : task.assignee ? task.assignee._id.toString(): null, done: true, date: completionDate})
        } catch (error) {
            throw new SystemError(error.message)
        }

        const newCompletionDate = new Date(completionDate);
        newCompletionDate.setDate(newCompletionDate.getDate() + task.template.periodicity)

        let nextTask
        try {
            nextTask = await Task.create({home: task.home._id.toString(), template: task.template._id.toString(), assignee : task.assignee ? task.assignee._id.toString(): null, done: false, date: newCompletionDate})
        } catch (error) {
            throw new SystemError(error.message)
        }

        try {
            await Task.findByIdAndDelete(taskId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        profile.points += task.template.points

        try {
            await completedTask.save()
            await nextTask.save()
            await profile.save()
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}

export default completeTask