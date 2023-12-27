import { validateText } from "../utils/validators"

function deletePost(postId, callback) {
    validateText(postId, 'post id')

    //TODO call api (fetch)
}

export default deletePost