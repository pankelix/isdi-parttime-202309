import mongoose from 'mongoose'

import retrieveTasks from './retrieveTasks.js'

(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test')

        const task = await retrieveTasks('65d79ed33377222a975829fa', -2)
        console.log('task retrieved', task)

        await mongoose.disconnect()
    } catch (error) {
        console.log(error)
    }
})()