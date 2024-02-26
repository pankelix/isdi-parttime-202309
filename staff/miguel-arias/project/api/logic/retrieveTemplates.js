import { validate, errors } from 'com'
const { SystemError, NotFoundError } = errors

import { Home, Template } from '../data/models.js'

function retrieveTemplates(homeId) {
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

        let templates
        try {
            templates = await Template.find({ home: homeId }).populate({ path: 'rooms', select: 'name' }).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!templates)
            throw new NotFoundError('templates not found')

        delete templates.id

        return templates
    })()
}

export default retrieveTemplates