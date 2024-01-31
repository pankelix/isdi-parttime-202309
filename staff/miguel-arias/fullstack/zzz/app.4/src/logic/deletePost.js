import context from "./context"
import validate from "./helpers/validate"
import errors from "./errors"

function deletePost(postId, callback) {
    validate.id(postId, 'post id')
    validate.function(callback, 'callback')

    const req = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${context.token}`
        }
    }

    fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/delete`, req)
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

export default deletePost