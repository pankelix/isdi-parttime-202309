import mongoose from 'mongoose'
import express from 'express'
import { NotFoundError, ContentError, DuplicityError, CredentialsError } from './logic/errors.js'
import logic from './logic/index.js'
import cors from 'cors'

mongoose.connect('mongodb://127.0.0.1:27017/test')
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

        /* register user */
        server.post('/users', jsonBodyParser, (req, res) => {
            try {
                const { name, email, password } = req.body

                logic.registerUser(name, email, password, error => {
                    if (error) {
                        let status = 500

                        if (error instanceof DuplicityError)
                            status = 409

                        res.status(status).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.status(201).send()
                })
            } catch (error) {
                let status = 500

                if (error instanceof ContentError || error instanceof TypeError)
                    status = 406

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        /* authenticate user */
        server.post('/users/auth', jsonBodyParser, (req, res) => {
            try {
                const { email, password } = req.body

                logic.authenticateUser(email, password, (error, userId) => {
                    if (error) {
                        let status = 500

                        if (error instanceof NotFoundError)
                            status = 404
                        else if (error instanceof CredentialsError)
                            status = 401

                        res.status(status).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.json(userId) /* si no pones status te pone un 200 por defecto */
                })
            } catch (error) {
                let status = 500

                if (error instanceof ContentError || error instanceof TypeError)
                    status = 406

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        /* retrieve users */
        server.get('/users', (req, res) => {
            try {
                const userId = req.headers.authorization.substring(7) /* cogemos el authorization y cortamos a partir del carácter 7 (para tener solo el id) */

                logic.retrieveUser(userId, (error, user) => {
                    if (error) {
                        let status = 500

                        if (error instanceof NotFoundError)
                            status = 404

                        res.status(status).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.json(user)
                })
            } catch (error) {
                let status = 500

                if (error instanceof ContentError || error instanceof TypeError)
                    status = 406

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        /* create post */
        server.post('/posts', jsonBodyParser, (req, res) => {
            try {
                const userId = req.headers.authorization.substring(7)
                const { image, text } = req.body

                logic.createPost(userId, image, text, error => {
                    if (error) {
                        let status = 500

                        if (error instanceof NotFoundError)
                            status = 404

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    }

                    res.status(201).send()
                })
            } catch (error) {
                let status = 500

                if (error instanceof ContentError || error instanceof TypeError)
                    status = 406

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        /* toggle like post */
        server.patch('/posts/:postId/likes', (req, res) => {
            try {
                const userId = req.headers.authorization.substring(7)

                const { postId } = req.params

                logic.toggleLikePost(userId, postId, error => {
                    if (error) {
                        let status = 500

                        if (error instanceof NotFoundError)
                            status = 404

                        res.status(status).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.status(204).send()
                })
            } catch (error) {
                let status = 500

                if (error instanceof ContentError || error instanceof TypeError)
                    status = 406

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        /* retrieve posts */
        server.get('/posts', (req, res) => {
            try {
                const postId = req.headers.authorization.substring(7)

                logic.retrievePosts(postId, (error, post) => {
                    if (error) {
                        let status = 500

                        if (error instanceof NotFoundError)
                            status = 404

                        res.status(status.json({ error: error.constructor.name, message: error.message }))

                        return
                    }

                    res.json(post)
                })

            } catch (error) {
                let status = 500

                if (error instanceof ContentError || error instanceof TypeError)
                    status = 406

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        /* retrieve fav posts */
        server.get('/posts/favs', (req, res) => {
            try {

                const userId = req.headers.authorization.substring(7)

                logic.retrieveFavPosts(userId, (error, posts) => {
                    if (error) {
                        let status = 500

                        if (error instanceof NotFoundError)
                            status = 404

                        res.status(status).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.json(posts)
                })

            } catch (error) {
                let status = 500

                if (error instanceof ContentError || error instanceof TypeError)
                    status = 406

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        /* toggle fav post */
        server.patch('/posts/:postId/favs', (req, res) => {
            try {
                const { postId } = req.params

                const userId = req.headers.authorization.substring(7)

                logic.toggleFavPost(postId, userId, error => {
                    if (error) {
                        let status = 500

                        if (error instanceof NotFoundError)
                            status = 404

                        res.status(status).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.status(204).send()
                })

            } catch (error) {
                let status = 500

                if (error instanceof ContentError || error instanceof TypeError)
                    status = 406

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        /* change user email */
        server.patch('/users/:userId/email', jsonBodyParser, (req, res) => {
            try {
                const { userId } = req.params

                const { newEmail, newEmailConfirm, password } = req.body

                logic.changeUserEmail(userId, newEmail, newEmailConfirm, password, error => {
                    if (error) {
                        let status = 500

                        if (error instanceof CredentialsError)
                            status = 401

                        if (error instanceof NotFoundError)
                            status = 404

                        if (error instanceof ContentError)
                            status = 406

                        res.status(status).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.status(204).send()
                })

            } catch (error) {
                let status = 500

                if (error instanceof ContentError || error instanceof TypeError)
                    status = 406

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        /* change user password */
        server.patch('/users/:userId/password', jsonBodyParser, (req, res) => {
            try {
                const { userId } = req.params

                const { password, newPassword, newPasswordConfirm } = req.body

                logic.changeUserPassword(userId, password, newPassword, newPasswordConfirm, error => {
                    if (error) {
                        let status = 500

                        if (error instanceof ContentError)
                            status = 406

                        if (error instanceof NotFoundError)
                            status = 404

                        if (error instanceof CredentialsError)
                            status = 401

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    }

                    res.status(204).send()
                })

            } catch (error) {
                let status = 500

                if (error instanceof ContentError || error instanceof TypeError)
                    status = 406

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        /* delete post */
        server.post('/posts/:postId/delete', (req, res) => {
            try {
                const { postId } = req.params

                const userId = req.headers.authorization.substring(7)

                logic.deletePost(userId, postId, error => {
                    if (error) {
                        let status = 505

                        if (error instanceof NotFoundError)
                            status = 404

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    }

                    res.status(204).send()
                })

            } catch (error) {
                let status = 500

                if (error instanceof ContentError || error instanceof TypeError)
                    status = 406

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        /* update post text */
        server.patch('/posts/:postId/text', jsonBodyParser, (req, res) => {
            try {
                const userId = req.headers.authorization.substring(7)

                const { postId } = req.params

                const { text } = req.body

                logic.updatePostText(userId, postId, text, error => {
                    if (error) {
                        let status = 505

                        if (error instanceof NotFoundError)
                            status = 404

                        res.status(status).json({ error: error.constructor.name, message: error.message })
                    }

                    res.status(204).send()
                })

            } catch (error) {
                let status = 500

                if (error instanceof ContentError || error instanceof TypeError)
                    status = 406

                res.status(status).json({ error: error.constructor.name, message: error.message })
            }
        })

        const date = new Date()

        server.listen(8000, () => console.log(`Server is online at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`))
    })
    .catch(error => console.error(error))