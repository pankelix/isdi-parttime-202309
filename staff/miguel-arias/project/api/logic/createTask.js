import { validate, errors } from 'com'
const { SystemError, NotFoundError } = errors

import { Task, Home } from '../data/models.js'

function createTask(homeId, templateId, date) {
    validate.id(homeId, 'home id')
    validate.id(templateId, 'template id')
    validate.date(date)

    return (async () => {
        let home
        try {
            home = await Home.findById(homeId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!home)
            throw new NotFoundError('home not found')

        date = new Date(date)

        try {
            const task = await Task.create({ home: homeId, template: templateId, date: date })

            return task
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}

export default createTask