const express = require('express')
const registerUser = require('./logic/registerUser')

const server = express()

server.get('/', (req, res) => res.send('hello api!'))
/* '/' es la ruta por defecto */
/* el status 200 es el por defecto */
/* tipo html es por defecto */
/* si envías una ruta que no exista, te hace un 404 por defecto */

/* http://127.0.0.1:8000/hello?name=Miguel&surname=Arias */
server.get('/hello', (req, res) => res.send(`Hello, ${req.query.name} ${req.query.surname}!`))

/* http://localhost:8000/register?name=Pepito+Grillo&email=pepito@grillo.com&password=123123123 */
/* problema, al ponerlo como get el navegador guarda los datos */
server.get('/register', (req, res) => {
    const { name, email, password } = req.query

    try {
        registerUser(name, email, password, error => {
            if (error) {
                res.status(400).json({error: error.constructor.name, message: error.message})

                return
            }

            res.status(201).send()
        })
    } catch (error) {
        res.status(400).json({error: error.constructor.name, message: error.message})
    }
})

server.listen(8000, () => console.log('server is online'))