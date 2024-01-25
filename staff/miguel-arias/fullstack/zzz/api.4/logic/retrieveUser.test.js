import mongoose from 'mongoose'

import retrieveUser from './retrieveUser.js'

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        try {
            retrieveUser('658e003d92e90fd57c67a684', (error, user) => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('user retrieved', user)
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))