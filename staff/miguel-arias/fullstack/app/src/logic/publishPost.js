import { validateText } from "../utils/validators"

function publishPost(image, text, callback) {
    validateText(image, 'image')
    validateText(text, 'text')

    // TODO call api (fetch)
}

export default publishPost