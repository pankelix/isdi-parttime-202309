import { validate, errors } from 'com'
const { SystemError, NotFoundError } = errors

import { Task } from '../data/models.js'

function assignTask(taskId, date) {
    validate.id(taskId, 'task id')

    return (async () => {
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

export default assignTask