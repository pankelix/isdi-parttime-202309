import mongoose from 'mongoose'

import retrieveTask from './retrieveTask.js'

(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test')
        debugger
        const task = await retrieveTask('65d606f1a72ef112179dee4b')
        console.log('task retrieved', task)

        await mongoose.disconnect()
    } catch (error) {
        console.log(error)
    }
})()