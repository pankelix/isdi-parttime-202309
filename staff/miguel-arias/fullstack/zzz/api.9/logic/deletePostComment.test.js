import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import deletePostComment from './deletePostComment'

mongoose.connect(process.env.MONGODB_API)
    .then(() => {
        try {
            deletePostComment('65b19f27d6e6253117769daf', '65baaeed4c7e822971516873')
                .then(() => console.log('comment deleted'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))