import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import authenticateUser from './authenticateUser.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_TEST)

    try {
        const userId = await authenticateUser('le@chuga.com', '123123123')

        console.log('user authenticated', userId)
    } catch (error) {
        console.error(error)
    }
})()