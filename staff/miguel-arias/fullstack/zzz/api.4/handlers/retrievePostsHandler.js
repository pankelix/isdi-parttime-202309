import logic from '../logic/index.js'
import { NotFoundError, ContentError } from '../logic/errors.js'

export default (req, res) => {
    try {
        const postId = req.headers.authorization.substring(7)

        logic.retrievePosts(postId, (error, post) => {
            if (error) {
                let status = 500

                if (error instanceof NotFoundError)
                    status = 404

                res.status(status.json({ error: error.constructor.name, message: error.message }))

                return
            }

            res.json(post)
        })

    } catch (error) {
        let status = 500

        if (error instanceof ContentError || error instanceof TypeError)
            status = 406

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}