import { validate, errors } from 'com'
const { SystemError } = errors
import session from './session'

function updatePostText(postId, text) {
    validate.id(postId, 'post id')
    validate.text(text)

    const req = {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${session.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
    }

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/text`, req)
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => { throw new errors[body.error](body.message) })
            }
        })
}

export default updatePostText