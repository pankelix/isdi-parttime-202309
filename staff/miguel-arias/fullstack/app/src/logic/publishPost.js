import { validate, errors } from 'com'
const { SystemError } = errors
import session from './session'

function publishPost(image, text) {
    validate.text(image, 'image')
    validate.text(text)

    const req = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image, text })
    }

    return fetch(`${import.meta.env.VITE_API_URL}/posts`, req)
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => { throw new errors[body.error](body.message) })
            }
        })
}

export default publishPost