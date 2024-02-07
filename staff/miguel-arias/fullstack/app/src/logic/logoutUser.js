import session from './session'

function logoutUser() {
    session.token = null

    return
}

export default logoutUser
