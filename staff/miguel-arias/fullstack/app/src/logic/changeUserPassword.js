import validate from "./helpers/validate"

function changeUserPassword(userId, password, newPassword, newPasswordConfirm, callback) {
    validate.id(userId, 'user id')
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

    fetch(`http://localhost:8000/users/${userId}/password`, req)
        .then(res => {
            if (!res.ok) {
                res.json()
                    .then(body => callback(new Error(body.message)))
                    .catch(error => callback(error))

                return
            }

            callback(null)
        })
        .catch(error => callback(error))
}

export default changeUserPassword