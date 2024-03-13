import { validate, errors } from 'com'
const { SystemError, NotFoundError } = errors

import { dayStart } from '@formkit/tempo'

import { Home, Task } from '../data/models.js'
import { ContentError } from 'com/errors.js'
debugger

function materializeTask(homeId, task) {
    validate.id(homeId, 'home id')
    validate.object(task)

    return (async () => {
        let home
        try {
            home = await Home.findById(homeId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!home)
            throw new NotFoundError('home not found')

        let date = new Date(task.date)
        const today = dayStart(new Date())

        if (today > date)
            throw new ContentError('date must be after today')

        try {
            const materializedTask = await Task.create({ home: homeId, template: task.template._id, date: date, oldId: task.id })

            return materializedTask._id.toString()
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}

export default materializeTask