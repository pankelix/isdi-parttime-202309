import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import registerProfile from './registerProfile.js'

(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test')

        await registerProfile('Peter Pan', '1234', 'green', 'admin')
        console.log('profile registered')
        await registerProfile('Wendy Darling', '1234', 'blue', 'admin')
        console.log('profile registered')
        await registerProfile('Michael Darling', '1234', 'white', 'user')
        console.log('profile registered')
        await registerProfile('John Darling', '1234', 'pink', 'user')
        console.log('profile registered')

        await mongoose.disconnect()
    } catch (error) {
        console.log(error)
    }
})()