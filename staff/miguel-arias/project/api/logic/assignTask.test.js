import mongoose from 'mongoose'
import assignTask from './assignTask.js'

(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/project')

        await assignTask('65dd06642ddc33bb0d3bfbee', '65da45873f666061bc54cf3c')

        console.log('task assigned')

        await mongoose.disconnect()
    } catch (error) {
        console.log(error)
    }
})()