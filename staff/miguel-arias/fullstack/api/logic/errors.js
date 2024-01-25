// 404
class NotFoundError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

// 500
class SystemError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

// 406
class ContentError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

// 409
class DuplicityError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

// 401
class CredentialsError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

// 401
class TokenError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

export {
    NotFoundError,
    SystemError,
    ContentError,
    DuplicityError,
    CredentialsError,
    TokenError
}