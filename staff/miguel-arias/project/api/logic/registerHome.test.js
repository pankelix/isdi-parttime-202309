import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import registerHome from './registerHome.js'

(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test')

        await registerHome('Man Sion', 'man@sion.com', '123123123')
        console.log('home registered')

        await mongoose.disconnect()
    } catch (error) {
        console.log(error)
    }
})()