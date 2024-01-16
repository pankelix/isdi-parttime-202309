import context from "./context"
import validate from "./helpers/validate"

function updatePostText(postId, text, callback) {
    validate.id(postId, 'post id')
    validate.text(text)
    validate.function(callback, 'callback')

    const req = {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${context.sessionUserId}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
    }

    fetch(`http://localhost:8000/posts/${postId}/text`, req)
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

export default updatePostText