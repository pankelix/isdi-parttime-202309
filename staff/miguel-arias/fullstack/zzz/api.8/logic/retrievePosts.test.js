import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import retrievePosts from './retrievePosts.js'

mongoose.connect(process.env.MONGODB_TEST)
    .then(() => {
        try {
            retrievePosts('65b13f0bc3827aee04ecdf3d')
                .then(posts => {
                    console.log('retrieved posts', posts)
                })
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))

