import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import createTask from './createTask.js'

(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test')

        await createTask('65d5081ea39e64389e9fd25a')
        await createTask('65d5081ea39e64389e9fd25e')
        await createTask('65d5081ea39e64389e9fd260')
        await createTask('65d5081ea39e64389e9fd263')
        await createTask('65d5081ea39e64389e9fd266')
        await createTask('65d5081ea39e64389e9fd268')
        await createTask('65d5081ea39e64389e9fd26a')

        console.log('task registered')

        await mongoose.disconnect()
    } catch (error) {
        console.log(error)
    }
})()