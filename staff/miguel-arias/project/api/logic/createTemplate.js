import { validate, errors } from 'com'
const { SystemError, NotFoundError, ContentError } = errors

import { Template, Home, Room } from '../data/models.js'
debugger

function createTemplate(homeId, name, periodicityNumber, periodicityRange, rooms, points) {
    validate.id(homeId, 'home id')
    validate.text(name, 'name')
    validate.number(periodicityNumber, 'periodicity number')
    validate.text(periodicityRange, 'periodicity range')
    validate.array(rooms, 'rooms')
    validate.number(points, 'points')

    return (async () => {

        if (periodicityNumber === 0)
            throw new ContentError("periodicity can't be 0")

        let home
        try {
            home = await Home.findById(homeId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!home)
            throw new NotFoundError('home not found')

        if (rooms.length === 0)
            throw new NotFoundError('rooms not found')

        rooms.forEach(async room => {
            let foundRoom
            try {
                foundRoom = await Room.find(room.id)
            } catch (error) {
                throw new SystemError(error.message)
            }

            if (!foundRoom)
                throw new NotFoundError('room not found')
        })

        let periodicity
        if (periodicityRange === 'day')
            periodicity = periodicityNumber
        else if (periodicityRange === 'week')
            periodicity = periodicityNumber * 7

        try {
            const template = await Template.create({ home: homeId, name, rooms, periodicity, points })

            return template
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}

export default createTemplate