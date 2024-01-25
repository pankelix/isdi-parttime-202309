import validate from "./helpers/validate"

function publishPost(userId, image, text, callback) {
    validate.id(userId, 'user id')
    validate.text(image, 'image')
    validate.text(text)
    validate.function(callback, 'callback')

    const req = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${userId}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image, text })
    }

    fetch(`${import.meta.env.VITE_API_URL}/posts`, req)
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

export default publishPost