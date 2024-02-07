import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import registerUser from './registerUser.js'
import { User } from '../data/models.js'

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_TEST)

        await registerUser('Le Chuga', 'le@chuga.com', '123123123')
        console.log('user registered')

        await registerUser('Man Zana', 'man@zana.com', '123123123')
        console.log('user registered')

        await registerUser('Pe Pino', 'pe@pino.com', '123123123')
        console.log('user registered')

    } catch (error) {
        console.error(error)
    }
})()