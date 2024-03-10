import mongoose from 'mongoose'

import retrieveTasks from './retrieveTasks.js'

(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/project2')

        const task = await retrieveTasks('65eb75180a9a6ff9f9422237', 2)
        console.log('task retrieved', task)

        await mongoose.disconnect()
    } catch (error) {
        console.log(error)
    }
})()