import { User, Post, CreditCard } from "./models"
import asyncDelay from "../utils/asyncDelay"
import { validateText } from "../utils/validators"

class Collection {
    constructor(clazz, documents) {
        this.__clazz__ = clazz
        this.__documents__ = documents
    }

    __clone__(document) {
        var copy = new this.__clazz__

        for (var key in document) {
            var value = document[key]

            if (value instanceof Array)
                copy[key] = [...value]
            else if (value instanceof Object)
                copy[key] = { ...value }
            else if (value instanceof Date)
                copy[key] = new Date(document[key])
            else
                copy[key] = value
        }

        return copy
    }

    __generateId__() {
        return Math.floor(Math.random() * 1000000000000000000).toString(36)
    }

    insert(document, callback) {
        asyncDelay(() => {
            const documentCopy = this.__clone__(document)

            documentCopy.id = this.__generateId__()

            this.__documents__.push(documentCopy)

            callback(null)
        })
    }

    __findIndexById__(id, callback) {
        try {
            validateText(id, `${this.__clazz__.name} id`)

            asyncDelay(() => {
                const index = this.__documents__.findIndex(document => document.id === id)

                callback(null, index)
            }, 0.4)
        } catch (error) {
            callback(error)
        }
    }

    getAll(callback) {
        asyncDelay(() => {
            callback(null, this.__documents__.map(this.__clone__.bind(this)))
        })
    }

    findById(id, callback) {
        try {
            validateText(id, `${this.__clazz__.name} id`)

            asyncDelay(() => {
                const document = this.__documents__.find(document => document.id === id)

                if (!document) {
                    callback(null, null)

                    return
                }

                callback(null, this.__clone__(document))
            })
        } catch (error) {
            callback(error)
        }
    }

    update(document, callback) {
        try {
            if (!(document instanceof this.__clazz__))
                callback(new TypeError(`document is not a ${this.__clazz__.name}`))

            asyncDelay(() => {
                this.__findIndexById__(document.id, (error, index) => {
                    if (error) {
                        callback(error)

                        return
                    }

                    if (index < 0) {
                        callback(new Error(`${this.__clazz__.name} not found`))

                        return
                    }

                    this.__documents__[index] = this.__clone__(document)

                    callback(null)
                })
            })
        } catch (error) {
            callback(error)
        }
    }

    deleteById(id, callback) {
        try {
            validateText(id, `${this.__clazz__.name} id`)

            asyncDelay(() => {
                this.__findIndexById__(id, (error, index) => {
                    if (error) {
                        callback(error)

                        return
                    }

                    if (index < 0) {
                        callback(new Error(`${this.__clazz__.name} not found`))

                        return
                    }

                    this.__documents__.splice(index, 1)

                    callback(null)
                })
            })
        } catch (error) {
            callback(error)
        }
    }
}

class Users extends Collection {
    constructor() {
        super(User, [])
    }

    findByEmail(email, callback) {
        try {
            validateText(email, 'email')

            asyncDelay(() => {
                const document = this.__documents__.find(document => document.email === email)

                if (!document)
                    callback(null, null)

                callback(null, this.__clone__(document))
            })
        } catch (error) {
            callback(error)
        }
    }
}

class Posts extends Collection {
    constructor() {
        super(Post, [])
    }
}

class CreditCards extends Collection {
    constructor() {
        super(CreditCard, [])
    }
}

export {
    Users,
    Posts,
    CreditCards
}