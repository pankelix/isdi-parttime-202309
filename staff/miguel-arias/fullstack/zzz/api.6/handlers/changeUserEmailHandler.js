import jwt from 'jsonwebtoken'
const { JsonWebTokenError } = jwt

import logic from '../logic/index.js'
import { NotFoundError, ContentError, CredentialsError, TokenError } from '../logic/errors.js'

export default (req, res) => {
    try {
        const { token } = req.params
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const userId = payload.sub

        const { newEmail, newEmailConfirm, password } = req.body

        logic.changeUserEmail(userId, newEmail, newEmailConfirm, password)
            .then(() => res.status(204).send())
            .catch(error => {
                let status = 500

                if (error instanceof CredentialsError)
                    status = 401

                if (error instanceof NotFoundError)
                    status = 404

                if (error instanceof ContentError)
                    status = 406

                res.status(status).json({ error: error.constructor.name, message: error.message })
            })
    } catch (error) {
        let status = 500

        if (error instanceof ContentError || error instanceof TypeError)
            status = 406

        if (error instanceof JsonWebTokenError) {
            status = 401
            error = new TokenError(error.message)
        }

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}