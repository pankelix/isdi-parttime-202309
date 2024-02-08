import { validate, errors } from 'com'
const { SystemError } = errors

function registerUser(name, email, password) {
    validate.text(name, 'name')
    validate.email(email, 'email')
    validate.password(password, 'password')

    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    }

    return (async () => {
        let res
        try {
            res = await fetch(`${import.meta.env.VITE_API_URL}/users`, req)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!res.ok) {
            try {
                const body = res.json()
                throw new errors[body.error](body.message)
            } catch (error) {
                throw new SystemError(error.message)
            }
        }
    })
}

export default registerUser