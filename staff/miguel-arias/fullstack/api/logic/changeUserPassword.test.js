import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import changeUserPassword from './changeUserPassword.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_TEST)

    try {
        await changeUserPassword('658f0f0ff58499e7aacac4f6', '123123123', '345345345', '345345345')
        console.log('password changed')
    } catch (error) {
        console.error(error)
    }
})()