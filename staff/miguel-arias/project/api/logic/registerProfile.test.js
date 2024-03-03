import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import registerProfile from './registerProfile.js'

(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test')

        await registerProfile('65d79ed33377222a975829fa', 'Michael Darling', '1234')
        console.log('profile registered')

        await mongoose.disconnect()
    } catch (error) {
        console.log(error)
    }
})()