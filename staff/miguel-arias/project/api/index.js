import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'

import {
    registerHomeHandler,
    authenticateHomeHandler,
    retrieveHomeHandler,
} from './handlers/index.js'

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        const server = express()
        const jsonBodyParser = express.json()

        server.use(cors())

        server.post('/homes', jsonBodyParser, registerHomeHandler)

        server.post('/homes/auth', jsonBodyParser, authenticateHomeHandler)

        server.get('/homes', retrieveHomeHandler)

        const date = new Date()
        server.listen(process.env.PORT, () => console.log(`Server is online at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} in port ${process.env.PORT}`))
    })
    .catch(error => console.error(error))