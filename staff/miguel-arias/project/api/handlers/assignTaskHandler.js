import jwt from 'jsonwebtoken'
const { JsonWebTokenError } = jwt

import { errors } from 'com'
const { NotFoundError, ContentError, TokenError } = errors

import logic from '../logic/index.js'

export default async (req, res) => {
    const token = req.headers.authorization.substring(7)
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const sessionProfileId = payload.sub

    const { profileId, taskId } = req.body

    let realProfileId = profileId

    if (profileId === null)
        realProfileId = sessionProfileId

    try {
        await logic.assignTask(taskId, realProfileId)
    } catch (error) {
        let status = 500

        if (error instanceof JsonWebTokenError) {
            status = 401
            error = new TokenError(error.message)
        }

        if (error instanceof NotFoundError)
            status = 404

        if (error instanceof DuplicityError)
            status = 409

        if (error instanceof ContentError || error instanceof TypeError)
            status = 406


        res.status(status).json({ error: error.constructor.name, message: error.message })
    }

    res.status(201).send()
}