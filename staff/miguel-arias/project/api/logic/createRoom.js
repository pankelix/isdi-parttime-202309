import { validate, errors } from 'com'
const { SystemError } = errors

import { Room, Home } from '../data/models.js'

function createRoom(homeId, name) {
    validate.id(homeId, 'home id')
    validate.text(name, 'name')

    return (async () => {
        try {
            const room = await Room.create({ home: homeId, name })

            return room
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}

export default createRoom