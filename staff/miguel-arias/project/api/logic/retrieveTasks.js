import { validate, errors } from 'com'
const { SystemError, NotFoundError } = errors

import { Home, Task } from '../data/models.js'

function retrieveTasks(homeId) {
    validate.id(homeId)

    return (async () => {
        let home
        try {
            home = await Home.findById(homeId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!home)
            throw new NotFoundError('home not found')

        let tasks
        try {
            tasks = await Task.find({ home: homeId }).populate('template').lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!tasks)
            throw new NotFoundError('task not found')

        delete tasks.id

        return tasks
    })()
}

export default retrieveTasks