import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import registerUser from './registerUser.js'
import { User } from '../data/models.js'

mongoose.connect(process.env.MONGODB_TEST)
    .then(() => User.deleteMany())
    .then(() => {
        try {
            registerUser('Le Chuga', 'le@chuga.com', '123123123')
                .then(() => console.log('user registered'))
                .catch(error => console.error(error))
            registerUser('Man Zana', 'man@zana.com', '123123123')
                .then(() => console.log('user registered'))
                .catch(error => console.error(error))
            registerUser('Pe Pino', 'pe@pino.com', '123123123')
                .then(() => console.log('user registered'))
                .catch(error => console.error(error))
        } catch (error) {
            console.log(error)
        }
    })
    .catch(error => console.error(error))