import { validate, errors } from 'com'
const { SystemError, NotFoundError } = errors

import { Task } from '../data/models.js'

function retrieveTask(taskId) {
    validate.id(taskId)

    return (async () => {
        let task
        try {
            task = await Task.findById(taskId).populate('templateRef').lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!task)
            throw new NotFoundError('task not found')

        delete task.id

        return task
    })()
}

export default retrieveTask