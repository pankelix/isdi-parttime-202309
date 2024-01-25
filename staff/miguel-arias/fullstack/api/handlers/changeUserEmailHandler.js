import logic from '../logic/index.js'
import { NotFoundError, ContentError, CredentialsError } from '../logic/errors.js'

export default (req, res) => {
    try {
        const { userId } = req.params

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

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}