import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'

import {
    registerHomeHandler,
    authenticateHomeHandler,
    retrieveHomeHandler,
    retrieveTasksHandler,
    retrieveProfilesHandler,
    retrieveTemplatesHandler,
    authenticateProfileHandler,
    retrieveRoleHandler,
    createTaskHandler,
    assignTaskHandler,
} from './handlers/index.js'

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        const server = express()
        const jsonBodyParser = express.json()

        server.use(cors())

        server.post('/homes', jsonBodyParser, registerHomeHandler)

        server.get('/homes', retrieveHomeHandler)

        server.post('/homes/auth', jsonBodyParser, authenticateHomeHandler)

        server.post('/profiles/auth', jsonBodyParser, authenticateProfileHandler)

        server.post('/tasks', jsonBodyParser, createTaskHandler)

        server.patch('/tasks', jsonBodyParser, assignTaskHandler)

        server.get('/tasks', retrieveTasksHandler)

        server.get('/profiles', retrieveProfilesHandler)

        server.get('/profiles/role', retrieveRoleHandler)

        server.get('/templates', retrieveTemplatesHandler)

        const date = new Date()
        server.listen(process.env.PORT, () => console.log(`Server is online at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} in port ${process.env.PORT}`))
    })
    .catch(error => console.error(error))