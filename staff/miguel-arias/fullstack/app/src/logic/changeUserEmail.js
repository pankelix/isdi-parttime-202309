import validate from "./helpers/validate"

function changeUserEmail(userId, newEmail, newEmailConfirm, password, callback) {
    validate.id(userId, 'user id')
    validate.email(newEmail, 'new email')
    validate.email(newEmailConfirm, 'new email confirm')
    validate.password(password, 'password')
    validate.function(callback, 'callback')

    const req = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newEmail, newEmailConfirm, password })
    }

    fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/email`, req)
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

export default changeUserEmail