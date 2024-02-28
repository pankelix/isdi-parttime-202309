import mongoose from 'mongoose'
import completeTask from './completeTask.js'

(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test')

        await completeTask('65d79ed33377222a97582a18', '65d79ed43377222a97582a2e', '1234', new Date)
        //sessionProfileId, taskId, pincode, date

        console.log('task completed')

        await mongoose.disconnect()
    } catch (error) {
        console.log(error)
    }
})()