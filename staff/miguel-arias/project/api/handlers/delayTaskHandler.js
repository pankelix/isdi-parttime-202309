import jwt from 'jsonwebtoken'

import { errors } from 'com'
const { NotFoundError, ContentError, TokenError } = errors

import logic from '../logic/index.js'

export default async (req, res) => {
    const token = req.headers.authorization.substring(7)
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const profileId = payload.sub

    const { date } = req.body

    const { taskId } = req.params

    try {
        await logic.delayTask(profileId, taskId, date)
    } catch (error) {
        let status = 500

        if (error instanceof JsonWebTokenError) {
            status = 401
            error = new TokenError(error.message)
        }

        if (error instanceof NotFoundError)
            status = 404

        if (error instanceof ContentError || error instanceof TypeError)
            status = 406

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }

    res.status(204).send()
}