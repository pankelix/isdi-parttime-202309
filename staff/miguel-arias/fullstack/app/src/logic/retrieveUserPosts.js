import { validate, errors } from 'com'

function retrieveUserPosts(userId, callback) {
    validate.id(userId, 'user id')
    validate.function(callback, 'callback')

    const req = {
        method: 'GET'
    }

    fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, req)
        .then(res => {
            if (!res.ok) {
                res.json()
                    .then(body => callback(new errors[body.error](body.message)))
                    .catch(error => callback(error))

                return
            }

            res.json()
                .then(posts => callback(null, posts))
                .catch(error => callback(error))

        })
        .catch(error => callback(error))
}

export default retrieveUserPosts