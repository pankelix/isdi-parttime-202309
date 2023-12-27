import { validateText } from "../utils/validators"
import context from './context'

function changeUserEmail(newEmail, newEmailConfirm, password, callback) {
    validateText(newEmail, 'new email')
    validateText(newEmailConfirm, 'new email confirm')
    validateText(password, 'password')

    //TODO call api (fetch)
}

export default changeUserEmail