import { validate, errors } from 'com'
const { SystemError } = errors

import { Task } from '../data/models.js'

function createTask(templateId, done, date) {
    validate.id(templateId, 'template id')
    validate.boolean(done, 'done')
    validate.date(date, 'date')

    return (async () => {
        try {
            await Task.create({ templateId, done, date })
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}

export default createTask