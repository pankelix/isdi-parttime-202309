import { validate, errors } from 'com'
const { SystemError, NotFoundError } = errors

import { dayStart } from '@formkit/tempo'

import { Home, Template, Task } from '../data/models.js'
import { ContentError } from 'com/errors.js'


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

        let template
        try {
            template = await Template.findById(templateId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!template)
            throw new NotFoundError('template not found')

        date = new Date(date)
        const today = dayStart(new Date())

        if (date < today)
            throw new ContentError('date must be after today')

        try {
            const task = await Task.create({ home: homeId, template: templateId, date: date })

            return task
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}

export default createTask