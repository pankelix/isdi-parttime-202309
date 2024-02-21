import { validate, errors } from 'com'
const { SystemError } = errors

import { Template } from '../data/models.js'

function createTemplate(name, rooms, periodicity, points) {
    validate.text(name, 'name')
    validate.array(rooms, 'rooms')
    validate.number(periodicity, 'periodicity')
    validate.number(points, 'points')

    return (async () => {
        try {
            const template = await Template.create({ name, rooms, periodicity, points })

            return template
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}

export default createTemplate