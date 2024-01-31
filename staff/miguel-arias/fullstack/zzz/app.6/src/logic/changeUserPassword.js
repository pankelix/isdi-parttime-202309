import context from "./context"
import validate from "./helpers/validate"
import errors from "./errors"

function changeUserPassword(password, newPassword, newPasswordConfirm, callback) {
    validate.password(password, 'password')
    validate.password(newPassword, 'new password')
    validate.password(newPasswordConfirm, 'new password confirm')
    validate.function(callback, 'callback')

    const req = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password, newPassword, newPasswordConfirm })
    }

    fetch(`${import.meta.env.VITE_API_URL}/users/${context.token}/password`, req)
        .then(res => {
            if (!res.ok) {
                res.json()
                    .then(body => callback(new errors[body.error](body.message)))
                    .catch(error => callback(error))

                return
            }

            callback(null)
        })
        .catch(error => callback(error))
}

export default changeUserPassword