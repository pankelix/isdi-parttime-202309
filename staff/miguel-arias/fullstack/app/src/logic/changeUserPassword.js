import { validate, errors } from 'com'
const { SystemError } = errors
import session from './session'

function changeUserPassword(password, newPassword, newPasswordConfirm) {
    validate.password(password, 'password')
    validate.password(newPassword, 'new password')
    validate.password(newPasswordConfirm, 'new password confirm')

    const req = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.token}`
        },
        body: JSON.stringify({ password, newPassword, newPasswordConfirm })
    }

    return (async () => {
        let res
        try {
            res = await fetch(`${import.meta.env.VITE_API_URL}/users/password`, req)
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
    })()
}

export default changeUserPassword