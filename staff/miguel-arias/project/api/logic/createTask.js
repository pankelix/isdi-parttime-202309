import { validate, errors } from 'com'
const { SystemError } = errors

import { Task } from '../data/models.js'

function createTask(templateId, assigneeId/* , done, date */) {
    validate.id(templateId, 'template id')
    validate.id(assigneeId, 'assignee id')
    /* validate.boolean(done, 'done')
    validate.date(date, 'date') */

    return (async () => {
        try {
            const task = await Task.create({ template: templateId, assignee: assigneeId/*, done, date  */ })

            return task
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}

export default createTask