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

    insert(document) {
        const documentCopy = this.__clone__(document)

        documentCopy.id = this.__generateId__()

        this.__documents__.push(documentCopy)
    }

    findIndexById(id) {
        validateText(id, `${this.__clazz__.name} id`)

        return this.__documents__.findIndex(document => document.id === id)
    }

    findById(id) {
        validateText(id, `${this.__clazz__.name} id`)

        const document = this.__documents__.find(document => document.id === id)

        if (!document)
            return null

        return this.__clone__(document)
    }

    update(document) {
        if (!(document instanceof this.__clazz__)) throw new TypeError(`document is not a ${this.__clazz__.name}`)

        const index = this.findIndexById(document.id)

        if (index < 0)
            throw new Error(`${this.__clazz__.name} not found`)

        this.__documents__[index] = this.__clone__(document)
    }

    deleteById(id) {
        validateText(id, `${this.__clazz__.name} id`)

        const index = this.findIndexById(id)

        if (index < 0) throw new Error(`${this.__clazz__.name} not found`)

        this.__documents__.splice(index, 1)
    }
}

class Users extends Collection {
    constructor() {
        super(User, [])
    }

    findByEmail(email) {
        validateText(email, `${this.__clazz__.name} email`)

        const document = this.__documents__.find(document => document.email === email)

        if (!document)
            return null

        return this.__clone__(document)
    }
}

class Posts extends Collection {
    constructor() {
        super(Post, [])
    }

    getAll() {
        return this.__documents__.map(this.__clone__.bind(this))
    }
}

class CreditCards extends Collection {
    constructor() {
        super(CreditCard, [])
    }
}