import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import createPost from './createPost.js'
import { Post, User } from '../data/models.js'

mongoose.connect(process.env.MONGODB_TEST)
    .then(() => Post.deleteMany())
    .then(() => User.create({ name: 'Peter Pan', email: 'peter@pan.com', password: '123123123' }))
    .then(user => {
        try {
            createPost(user.id, 'https://image.com/image', 'peter pan post 1')
                .then(() => console.log('post created'))
                .catch(error => console.error(error))
            createPost(user.id, 'https://image.com/image2', 'peter pan post 2')
                .then(() => console.log('post created'))
                .catch(error => console.error(error))
            createPost(user.id, 'https://image.com/image3', 'peter pan post 3')
                .then(() => console.log('post created'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))