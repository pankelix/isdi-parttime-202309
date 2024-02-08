import { validate, errors } from 'com'
const { SystemError } = errors
import session from './session'

function loginUser(email, password) {
    validate.email(email)
    validate.password(password)

    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }

    return (async () => {
        let res
        try {
            res = await fetch(`${import.meta.env.VITE_API_URL}/users/auth`, req)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!res.ok) {
            try {
                const body = await res.json()
                throw new errors[body.error](body.message)
            } catch (error) {
                throw new SystemError(error.message)
            }
        }

        const token = await res.json()

        const payloadB64 = token.slice(token.indexOf('.') + 1, token.lastIndexOf('.'))
        const payloadJson = atob(payloadB64)
        const payload = JSON.parse(payloadJson)
        const userId = payload.sub

        session.userId = userId
        session.token = token
    })()
}

export default loginUser