import mongoose from 'mongoose'

import registerUser from './registerUser.js'

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        try {
            registerUser('Le Chuga', 'le@chuga.com', '123123123', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('user registered')
            })
        } catch (error) {
            console.log(error)
        }
    })
    .catch(error => console.error(error))