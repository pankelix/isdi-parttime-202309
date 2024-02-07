import { validate, errors } from 'com'

function toggleEditPost(postId) {
    validate.id(postId, 'post id')

    return
}

export default toggleEditPost