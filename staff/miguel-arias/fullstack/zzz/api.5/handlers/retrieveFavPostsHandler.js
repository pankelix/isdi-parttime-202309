import logic from '../logic/index.js'
import { NotFoundError, ContentError } from '../logic/errors.js'

export default (req, res) => {
    try {

        const userId = req.headers.authorization.substring(7)

        logic.retrieveFavPosts(userId)
            .then(posts => res.json(posts))
            .catch(error => {
                let status = 500

                if (error instanceof NotFoundError)
                    status = 404

                res.status(status).json({ error: error.constructor.name, message: error.message })
            })
    } catch (error) {
        let status = 500

        if (error instanceof ContentError || error instanceof TypeError)
            status = 406

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}