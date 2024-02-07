import { validate, errors } from 'com'
const { SystemError } = errors
import session from './session'

function changeUserEmail(newEmail, newEmailConfirm, password) {
    validate.email(newEmail, 'new email')
    validate.email(newEmailConfirm, 'new email confirm')
    validate.password(password, 'password')

    const req = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.token}`
        },
        body: JSON.stringify({ newEmail, newEmailConfirm, password })
    }

    return fetch(`${import.meta.env.VITE_API_URL}/users/email`, req)
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => { throw new errors[body.error](body.message) })
            }
        })
}

export default changeUserEmail