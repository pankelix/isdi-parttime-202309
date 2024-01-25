import mongoose from 'mongoose'

import deletePost from './deletePost.js'
import { User, Post } from '../data/models.js'

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => User.deleteMany())
    .then(() => Post.deleteMany())
    .then(() => User.create({ name: '123 Pan', email: '123@pan.com', password: '123123123' }))
    .then(user => Post.create({ author: user.id, image: 'http://image.com/image', text: 'test text', likes: [] }))
    .then(post => {
        try {
            console.log(post)
            deletePost(post.author.toString(), post.id)
                .then(() => console.log('post deleted'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
