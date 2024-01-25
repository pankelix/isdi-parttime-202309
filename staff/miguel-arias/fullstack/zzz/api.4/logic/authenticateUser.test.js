import mongoose from 'mongoose'

import authenticateUser from './authenticateUser.js'

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        try {
            authenticateUser('le@chuga.com', '123123123', (error, userId) => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('user authenticated', userId)
            })
        } catch (error) {
            console.log(error)
        }
    })
    .catch(error => console.error(error))