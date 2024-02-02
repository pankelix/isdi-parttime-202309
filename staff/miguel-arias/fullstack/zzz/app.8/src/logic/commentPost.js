import { validate, errors } from 'com'
import session from './session'

function commentPost(userId, postId, textToComment, callback) {
    validate.id(userId, 'user id')
    validate.id(postId, 'post id')
    validate.text(textToComment, 'text to comment')
    validate.function(callback, 'callback')

    const req = {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${session.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ textToComment })
    }

    fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/comment`, req)
        .then(res => {
            if (!res.ok) {
                res.json()
                    .then(body => callback(new errors[body.error](body.message)))
                    .catch(error => callback(error))

                return
            }

            callback(null)
        })
        .catch(error => callback(error))
}

export default commentPost