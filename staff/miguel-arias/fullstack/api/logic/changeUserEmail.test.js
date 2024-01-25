import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import changeUserEmail from './changeUserEmail.js'

mongoose.connect(process.env.MONGODB_TEST)
    .then(() => {
        try {
            changeUserEmail('658f0f0ff58499e7aacac4f6', "ma@zorca3.com", "ma@zorca3.com", "123123123", error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('email changed')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))