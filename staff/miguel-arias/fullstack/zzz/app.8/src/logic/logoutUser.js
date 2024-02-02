import { validate, errors } from 'com'
import session from './session'

function logoutUser(callback) {
    validate.function(callback, 'callback')
    
    session.token = null

    callback(null)
}

export default logoutUser