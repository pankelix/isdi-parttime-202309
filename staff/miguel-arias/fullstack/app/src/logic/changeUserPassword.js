import { validateText } from "../utils/validators"

function changeUserPassword(userId, password, newPassword, newPasswordConfirm, callback) {
    validateText(userId, 'user id')
    validateText(password, 'password')
    validateText(newPassword, 'new password')
    validateText(newPasswordConfirm, 'new password confirm')

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