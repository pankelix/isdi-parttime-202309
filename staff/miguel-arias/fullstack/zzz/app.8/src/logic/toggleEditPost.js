import { validate, errors } from 'com'

function toggleEditPost(postId, callback) {
    validate.id(postId, 'post id')
    validate.function(callback, 'callback')

    callback(null)
}

export default toggleEditPost