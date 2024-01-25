import validate from "./helpers/validate"
import context from './context'

function retrievePosts(callback) {
    validate.function(callback, 'callback')

    const req = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${context.sessionUserId}`
        }
    }

    fetch(`${import.meta.env.VITE_API_URL}/posts`, req)
        .then(res => {
            if (!res.ok) {
                res.json()
                    .then(body => callback(new Error(body.message)))
                    .catch(error => callback(error))

                return
            }

            res.json()
                .then(posts => callback(null, posts))
                .catch(error => callback(error))
        })
        .catch(error => callback(error))
}

export default retrievePosts