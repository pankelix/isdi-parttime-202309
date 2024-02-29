import mongoose from 'mongoose'
import completeTask from './completeTask.js'

(async () => {
    const date = '2024-03-01'
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/project')

        await completeTask('65da45873f666061bc54cf3c', '65da45873f666061bc54cf5c', '1234', new Date(date))
        //sessionProfileId, taskId, pincode, date

        console.log('task completed')

        await mongoose.disconnect()
    } catch (error) {
        console.log(error)
    }
})()