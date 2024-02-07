import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import retrieveUser from './retrieveUser.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_TEST)

    try {
        const user = await retrieveUser('65ad002fef3ad31ab82d3e38')

        console.log('user retrieved', user)
    } catch (error) {
        console.error(error)
    }
})()