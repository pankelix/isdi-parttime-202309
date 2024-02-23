import { validate, errors } from 'com'
const { SystemError } = errors

import { Task } from '../data/models.js'

function createTask(homeId, templateId, assigneeId) {
    validate.id(homeId, 'home id')
    validate.id(templateId, 'template id')
    validate.id(assigneeId, 'assignee id')

    return (async () => {
        try {
            const task = await Task.create({ home: homeId, template: templateId, assignee: assigneeId})

            return task
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}

export default createTask