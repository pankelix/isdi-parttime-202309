import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import commentPost from './commentPost.js'

mongoose.connect(process.env.MONGODB_API)
    .then(() => {
        try {
            commentPost('65b19f27d6e6253117769daf', '65b587857c7c44c288491613', 'comentario random')
                .then(() => console.log('commented'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))