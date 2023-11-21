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
        }, 1)
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
            }, 0.6)
        } catch (error) {
            callback(error)
        }
    }

    update(document, callback) {
        try {
            if (!(document instanceof this.__clazz__)) throw new TypeError(`document is not a ${this.__clazz__.name}`)

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
            }, 0.5)
        } catch (error) {
            callback(error)
        }
    }

    deleteById(id) {
        validateText(id, `${this.__clazz__.name} id`)

        const index = this.__findIndexById__(id)

        if (index < 0) throw new Error(`${this.__clazz__.name} not found`)

        this.__documents__.splice(index, 1)
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
            }, 0.7)
        } catch (error) {
            callback(error)
        }
    }
}

class Posts extends Collection {
    constructor() {
        super(Post, [])
    }

    getAll(callback) {
        asyncDelay(() => {
            callback(null, this.__documents__.map(this.__clone__.bind(this)))
        }, 0.8)
    }
}

class CreditCards extends Collection {
    constructor() {
        super(CreditCard, [])
    }
}