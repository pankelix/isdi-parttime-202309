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

    return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, req)
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(body => { throw new errors[body.error](body.message) })
            }

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(token => {
                    // 325435435345.345435345345345.345345345345
                    const payloadB64 = token.slice(token.indexOf('.') + 1, token.lastIndexOf('.'))
                    // 345435345345345 (entre los puntos)
                    const payloadJson = atob(payloadB64)
                    // {"sub":"el id", "iat":"231312323"} objeto json
                    const payload = JSON.parse(payloadJson)
                    // {sub: "el id", iat: "231312323"} objeto normal
                    const userId = payload.sub
                    // el id

                    session.userId = userId
                    session.token = token
                })
        })
}

export default loginUser