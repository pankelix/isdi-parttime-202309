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
        })

        /* let duplicatedTasks = tasks.map(task => ({ ...task, date: new Date(task.date) }))
        let newTasks = []
        duplicatedTasks.forEach(task => {
            task.date = addDay(new Date(task.date), task.template.periodicity)
            task.assignee = ''
            //if (task.date >= startOfCurrentWeek && task.date <= endOfCurrentWeek)
            newTasks.push(task)
        })

        const allTasks = [...tasks, ...newTasks].sort((a, b) => a.date - b.date);

        return allTasks */

        return tasks
    })()
}

export default retrieveTasks