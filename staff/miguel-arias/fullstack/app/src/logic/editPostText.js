import { validateText, /* validateFunction */ } from "../utils/validators"

function editPostText(text, postId, callback) {
    validateText(text, 'text to edit')
    validateText(postId, 'post id')
    /* validateFunction(callback, 'callback') */

    // TODO call api (fetch)
}

export default editPostText