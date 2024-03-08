import { validate, errors } from 'com'
const { SystemError, NotFoundError } = errors

import { addDay, weekStart, weekEnd, dayEnd } from '@formkit/tempo'

import { Home, Task } from '../data/models.js'

function retrieveTasks(homeId, week) {
    validate.id(homeId)

    return (async () => {
        debugger
        let home
        try {
            home = await Home.findById(homeId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!home)
            throw new NotFoundError('home not found')

        const currentDate = addDay(new Date(), week * 7)

        const startOfCurrentWeek = weekStart(currentDate, 1)

        const endOfCurrentWeek = weekEnd(currentDate, 1)

        let tasks
        try {
            tasks = await Task.find({ home: homeId, date: { $gte: startOfCurrentWeek, $lte: endOfCurrentWeek } }).populate('template', '-__v').select('-__v').sort({ date: 1 }).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!tasks)
            throw new NotFoundError('task not found')

        tasks.forEach(task => {
            task.id = task._id.toString()
            delete task._id

            task.date = dayEnd(task.date)

            /* if (task.home._id) {
                task.home.id = task.home._id.toString()
                delete task.home._id
            } */

            /* if (task.template._id) {
                task.template.id = task.template._id.toString()
                delete task.template._id
            } */

            /* if (task.template.home._id) {
                task.template.home.id = task.template.home._id.toString()
                delete task.template.home._id
                delete task.template.__v
            } */

            /* if (task.template.rooms.length >= 1) {
                task.template.rooms.forEach(room => {
                    room.id = room._id.toString()
                    delete room._id
                })
            } */

            /* if (task.assignee._id) {
                task.assignee.id = task.assignee._id.toString()
                delete task.assignee._id
            } */
        })

        return tasks
    })()
}

export default retrieveTasks