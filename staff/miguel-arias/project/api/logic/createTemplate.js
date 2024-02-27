import { validate, errors } from 'com'
const { SystemError, NotFoundError } = errors

import { Template, Home } from '../data/models.js'

function createTemplate(homeId, name, rooms, periodicity, points) {
    validate.id(homeId, 'home id')
    validate.text(name, 'name')
    validate.array(rooms, 'rooms')
    validate.number(periodicity, 'periodicity')
    validate.number(points, 'points')

    return (async () => {
        let home
        try {
            home = await Home.findById(homeId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!home)
            throw new NotFoundError('home not found')

        try {
            const template = await Template.create({ home: homeId, name, rooms, periodicity, points })

            return template
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}

export default createTemplate