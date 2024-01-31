import { validate, errors } from 'com'
import session from './session'

function retrieveUser(callback) {
    validate.function(callback, 'callback')

    const req = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session.token}`
        }
    }

    fetch(`${import.meta.env.VITE_API_URL}/users`, req)
        .then(res => {
            if (!res.ok) {
                res.json()
                    .then(body => callback(new errors[body.error](body.message)))
                    .catch(error => callback(error))

                return
            }

            res.json()
                .then(user => callback(null, user))
                .catch(error => callback(error))
        })
        .catch(error => callback(error))
}

export default retrieveUser