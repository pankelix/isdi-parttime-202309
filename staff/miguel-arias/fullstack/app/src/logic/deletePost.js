import { validateText } from "../utils/validators"

function deletePost(userId, postId, callback) {
    validateText(userId, 'user id')
    validateText(postId, 'post id')

    const req = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${userId}`
        }
    }

    fetch(`http://localhost:8000/posts/${postId}/delete`, req)
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