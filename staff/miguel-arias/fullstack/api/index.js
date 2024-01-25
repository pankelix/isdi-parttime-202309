import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'

import {
    registerUserHandler,
    authenticateUserHandler,
    retrieveUserHandler,
    changeUserEmailHandler,
    changeUserPasswordHandler,
    createPostHandler,
    deletePostHandler,
    retrievePostsHandler,
    retrieveFavPostsHandler,
    toggleLikePostHandler,
    toggleFavPostHandler,
    updatePostTextHandler
} from './handlers/index.js'

mongoose.connect(process.env.MONGODB_API)
    .then(() => {
        const server = express()

        server.get('/', (req, res) => res.send('hello api!'))
        /* '/' es la ruta por defecto */
        /* el status 200 es el por defecto */
        /* tipo html es por defecto */
        /* si envías una ruta que no exista, te hace un 404 por defecto */

        /* http://127.0.0.1:8000/hello?name=Miguel&surname=Arias */
        server.get('/hello', (req, res) => res.send(`Hello, ${req.query.name} ${req.query.surname}!`))

        const jsonBodyParser = express.json()

        server.use(cors())

        server.post('/users', jsonBodyParser, registerUserHandler)

        server.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        server.get('/users', retrieveUserHandler)

        server.patch('/users/:userId/email', jsonBodyParser, changeUserEmailHandler)

        server.patch('/users/:userId/password', jsonBodyParser, changeUserPasswordHandler)

        server.post('/posts', jsonBodyParser, createPostHandler)

        server.post('/posts/:postId/delete', deletePostHandler)
        
        server.get('/posts', retrievePostsHandler)
        
        server.get('/posts/favs', retrieveFavPostsHandler)

        server.patch('/posts/:postId/likes', toggleLikePostHandler)

        server.patch('/posts/:postId/favs', toggleFavPostHandler)

        server.patch('/posts/:postId/text', jsonBodyParser, updatePostTextHandler)

        const date = new Date()

        server.listen(process.env.PORT, () => console.log(`Server is online at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} in port ${process.env.PORT}`))
    })
    .catch(error => console.error(error))