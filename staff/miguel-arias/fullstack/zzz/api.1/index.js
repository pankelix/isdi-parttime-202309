const express = require ('express')
const registerUser = require ('./logic/registerUser')
const authenticateUser = require ('./logic/authenticateUser')
const retrieveUser = require ('./logic/retrieveUser')
const retrievePosts = require ('./logic/retrievePosts')
const createPost = require ('./logic/createPost')
const toggleLikePost = require ('./logic/toggleLikePost')
const { SystemError, NotFoundError, ContentError, DuplicityError } = require ('./utils/errors')

const server = express()

server.get('/', (req, res) => res.send('hello api!'))
/* '/' es la ruta por defecto */
/* el status 200 es el por defecto */
/* tipo html es por defecto */
/* si envías una ruta que no exista, te hace un 404 por defecto */

/* http://127.0.0.1:8000/hello?name=Miguel&surname=Arias */
server.get('/hello', (req, res) => res.send(`Hello, ${req.query.name} ${req.query.surname}!`))

const jsonBodyParser = express.json()

server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "*")
    res.setHeader("Access-Control-Allow-Methods", "*")

    next()
})

server.post('/users', jsonBodyParser, (req, res) => {
    try {
        const { name, email, password } = req.body

        registerUser(name, email, password, error => {
            if (error) {
                let status = 400

                if (error instanceof DuplicityError)
                    status = 409
                else if (error instanceof SystemError)
                    status = 500

                res.status(status).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.status(201).send()
        })
    } catch (error) {
        let status = 400

        if (error instanceof ContentError)
            status = 406

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
})

server.post('/users/auth', jsonBodyParser, (req, res) => {
    try {
        const { email, password } = req.body

        authenticateUser(email, password, (error, userId) => {
            if (error) {
                let status = 400

                if (error instanceof NotFoundError)
                    status = 404
                else if (error instanceof ContentError)
                    status = 406
                else if (error instanceof SystemError)
                    status = 500

                res.status(status).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.json(userId) /* si no pones status te pone un 200 por defecto */
        })
    } catch (error) {
        let status = 400

        if (error instanceof ContentError)
            status = 406

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
})

server.get('/users', (req, res) => {
    try {
        const userId = req.headers.authorization.substring(7) /* cogemos el authorization y cortamos a partir del carácter 7 (para tener solo el id) */

        retrieveUser(userId, (error, user) => {
            if (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.json(user)
        })
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

server.get('/posts', (req, res) => {
    try {
        const userId = req.headers.authorization.substring(7)

        retrievePosts(userId, (error, posts) => {
            if (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.json(posts)
        })
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

server.post('/posts', jsonBodyParser, (req, res) => {
    try {
        const userId = req.headers.authorization.substring(7)
        const { image, text } = req.body

        createPost(userId, image, text, error => {
            if (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })
            }

            res.status(201).send()
        })
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

server.patch('/posts/:postId/likes', (req, res) => {
    try {
        const userId = req.headers.authorization.substring(7)

        const { postId } = req.params

        toggleLikePost(userId, postId, error => {
            if (error) {
                let status = 400

                if (error instanceof SystemError)
                    status = 500
                else if (error instanceof NotFoundError)
                    status = 404

                res.status(status).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.status(204).send()
        })
    } catch (error) {
        let status = 400

        if (error instanceof ContentError)
            status = 406

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
})

const date = new Date()

server.listen(8000, () => console.log(`server is online at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`))