const session = {
    set sessionUserId(userId) {
        if (userId) // session.userId = '123' entrará aqui
            sessionStorage.userId = userId
        else // si pongo session.userId = null, entrará aqui
            delete sessionStorage.userId
    },

    get sessionUserId() {
        // sessionStorage.userId
        return sessionStorage.userId ? sessionStorage.userId : null
    },

    set token(token) {
        if (token) // session.token = '123' entrará aqui
            sessionStorage.token = token
        else // si pongo session.token = null, entrará aqui
            delete sessionStorage.token
    },

    get token() {
        // sessionStorage.token
        return sessionStorage.token ? sessionStorage.token : null
    },
}

export default session