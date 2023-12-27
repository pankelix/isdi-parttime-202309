import { validateText } from "../utils/validators"
import context from './context'

function changeUserPassword(password, newPassword, newPasswordConfirm, callback) {
    validateText(password, 'password')
    validateText(newPassword, 'new password')
    validateText(newPasswordConfirm, 'new password confirm')

    //TODO call api (fetch)
}

export default changeUserPassword