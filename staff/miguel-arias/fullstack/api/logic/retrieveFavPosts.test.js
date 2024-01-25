import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import retrieveFavPosts from './retrieveFavPosts.js'

mongoose.connect(process.env.MONGODB_TEST)
    .then(() => {
        try {
            retrieveFavPosts('65849effd6fe566e658c5580')
                .then(posts => console.log('posts retrieved', posts))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))