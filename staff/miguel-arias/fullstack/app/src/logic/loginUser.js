import validate from "./helpers/validate"
import context from './context'

function loginUser(email, password, callback) {
    validate.email(email)
    validate.password(password)
    validate.function(callback, 'callback')

    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }

    fetch(`${import.meta.env.VITE_API_URL}/users/auth`, req)
        .then(res => {
            if (!res.ok) {
                res.json()
                    .then(body => callback(new Error(body.message)))
                    .catch(error => callback(error))

                return
            }

            res.json()
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

                    context.sessionUserId = userId
                    callback(null)
                    context.token = token
                })
                .catch(error => callback(error))
        })
        .catch(error => callback(error))
}

export default loginUser