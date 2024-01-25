import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import retrieveUser from './retrieveUser.js'

mongoose.connect(process.env.MONGODB_TEST)
    .then(() => {
        try {
            retrieveUser('65ad002fef3ad31ab82d3e38')
                .then(user => console.log('user retrieved', user))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))