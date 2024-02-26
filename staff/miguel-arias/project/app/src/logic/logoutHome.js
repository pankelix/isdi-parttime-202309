import session from './session'

function logoutUser() {
    session.token = null
    session.homeId
    session.profileToken = null
    session.profileId = null

    return
}

export default logoutUser