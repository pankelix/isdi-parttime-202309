import context from './context'

function logoutUser(callback) {
    context.sessionUserId = null

    callback(null)
}

export default logoutUser