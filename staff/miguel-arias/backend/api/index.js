const express = require('express')
const registerUser = require('./logic/registerUser')
const authenticateUser = require('./logic/authenticateUser')
const retrieveUser = require('./logic/retrieveUser')

const server = express()

server.get('/', (req, res) => res.send('hello api!'))
/* '/' es la ruta por defecto */
/* el status 200 es el por defecto */
/* tipo html es por defecto */
/* si envías una ruta que no exista, te hace un 404 por defecto */

/* http://127.0.0.1:8000/hello?name=Miguel&surname=Arias */
server.get('/hello', (req, res) => res.send(`Hello, ${req.query.name} ${req.query.surname}!`))

const jsonBodyParser = express.json()

server.post('/users', jsonBodyParser, (req, res) => {
    try {
        const { name, email, password } = req.body

        registerUser(name, email, password, error => {
            if (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.status(201).send()
        })
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

server.post('/users/auth', jsonBodyParser, (req, res) => {
    try {
        const { email, password } = req.body

        authenticateUser(email, password, (error, userId) => {
            if (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.json(userId) /* si no pones status te pone un 200 por defecto */
        })
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
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

const date = new Date()

server.listen(8000, () => console.log(`server is online at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`))