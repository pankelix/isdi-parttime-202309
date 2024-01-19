import mongoose from 'mongoose'

import changeUserPassword from './changeUserPassword.js'

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        try {
            changeUserPassword('658f0f0ff58499e7aacac4f6', '123123123', '345345345', '345345345', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('password changed')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))