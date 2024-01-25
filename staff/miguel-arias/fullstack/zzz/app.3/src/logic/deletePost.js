import validate from "./helpers/validate"

function deletePost(userId, postId, callback) {
    validate.id(userId, 'user id')
    validate.id(postId, 'post id')
    validate.function(callback, 'callback')

    const req = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${userId}`
        }
    }

    fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/delete`, req)
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

export default deletePost