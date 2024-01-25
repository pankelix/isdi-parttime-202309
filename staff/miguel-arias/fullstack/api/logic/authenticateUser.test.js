import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import authenticateUser from './authenticateUser.js'

mongoose.connect(process.env.MONGODB_TEST)
    .then(() => {
        try {
            authenticateUser('le@chuga.com', '123123123')
                .then(userId => {
                    console.log('user authenticated', userId)
                })
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))