import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import authenticateHome from './authenticateHome.js'

(async () => {
    try {
        await mongoose.connect(process.env.TEST_MONGODB_URL)

        const homeId = await authenticateHome('man@sion.com', '123123123')
        console.log('home authenticated', homeId)

        await mongoose.disconnect()
    } catch (error) {
        console.log(error)
    }
})()