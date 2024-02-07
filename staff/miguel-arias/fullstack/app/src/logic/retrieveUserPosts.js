import { validate, errors } from 'com'
const { SystemError } = errors
import session from './session'

function retrieveUserPosts(targetUserId) {
    validate.id(targetUserId, 'target user id')

    const req = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session.token}`
        }
    }

    return fetch(`${import.meta.env.VITE_API_URL}/users/${targetUserId}/posts`, req)
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => { throw new errors[body.error](body.message) })
            }

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(posts => posts)
        })
}

export default retrieveUserPosts