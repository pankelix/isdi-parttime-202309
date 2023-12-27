import { validateText } from "../utils/validators"

function toggleEditPost(postId, callback) {
    validateText(postId, 'post id')

    // TODO call api (fetch)
}

export default toggleEditPost