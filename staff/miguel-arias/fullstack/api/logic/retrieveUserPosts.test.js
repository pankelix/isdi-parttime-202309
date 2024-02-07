import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import retrieveUserPosts from './retrieveUserPosts.js.js'

mongoose.connect(process.env.MONGODB_API)
    .then(() => {
        try {
            retrieveUserPosts("65b19f27d6e6253117769daf", "65b19f27d6e6253117769daf")
                .then(user => console.log('user posts retrieved', user))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))