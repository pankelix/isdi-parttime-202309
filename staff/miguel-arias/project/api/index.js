import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'

import {
    registerHomeHandler,
    retrieveHomeHandler,
    authenticateHomeHandler,
    retrieveProfilesHandler,
    retrieveRoleHandler,
    authenticateProfileHandler,
    createTaskHandler,
    retrieveTasksHandler,
    deleteTaskHandler,
    assignTaskHandler,
    delayTaskHandler,
    completeTaskHandler,
    retrieveTemplatesHandler,
    retrieveRoomsHandler,
    createTemplateHandler,
    redeemPointsHandler,
    deleteTemplateHandler,
    editTemplateHandler,
    createRoomHandler,
    deleteRoomHandler,
    editRoleHandler,
    deleteProfileHandler,
} from './handlers/index.js'

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        const server = express()
        const jsonBodyParser = express.json()

        server.use(cors())

        server.post('/homes', jsonBodyParser, registerHomeHandler)

        server.get('/homes', retrieveHomeHandler)

        server.post('/homes/auth', jsonBodyParser, authenticateHomeHandler)

        server.get('/profiles', retrieveProfilesHandler)

        server.get('/profiles/:profileId/role', retrieveRoleHandler)

        server.post('/profiles/auth', jsonBodyParser, authenticateProfileHandler)

        server.post('/profiles/:profileId/delete', deleteProfileHandler)

        server.patch('/profiles/:profileId/edit', jsonBodyParser, editRoleHandler)

        server.get('/tasks', retrieveTasksHandler)

        server.post('/tasks', jsonBodyParser, createTaskHandler)

        server.post('/tasks/:taskId/delete', deleteTaskHandler)

        server.patch('/tasks/:taskId/assign', jsonBodyParser, assignTaskHandler)

        server.patch('/tasks/:taskId/delay', jsonBodyParser, delayTaskHandler)

        server.patch('/tasks/:taskId/complete', jsonBodyParser, completeTaskHandler)

        server.get('/templates', retrieveTemplatesHandler)

        server.post('/templates', jsonBodyParser, createTemplateHandler)

        server.post('/templates/:templateId/delete', deleteTemplateHandler)

        server.patch('/templates/:templateId/edit', jsonBodyParser, editTemplateHandler)

        server.get('/rooms', retrieveRoomsHandler)

        server.post('/rooms', jsonBodyParser, createRoomHandler)

        server.post('/rooms/:roomId/delete', deleteRoomHandler)

        server.patch('/stats/:profileId/redeem', jsonBodyParser, redeemPointsHandler)

        const date = new Date()
        server.listen(process.env.PORT, () => console.log(`Server is online at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} in port ${process.env.PORT}`))
    })
    .catch(error => console.error(error))