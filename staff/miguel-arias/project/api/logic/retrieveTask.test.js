import mongoose from 'mongoose'

import retrieveTask from './retrieveTask.js'

(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test')
        debugger
        const task = await retrieveTask('65d61642509a026d6e3e2138')
        console.log('task retrieved', task)

        await mongoose.disconnect()
    } catch (error) {
        console.log(error)
    }
})()