class Collection {
    constructor(clazz, collection) {
        this.clazz = clazz
        this.collection = collection
    }

    clone(document) {
        var copy = new this.clazz

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

    generateId() {
        return Math.floor(Math.random() * 1000000000000000000).toString(36)
    }

    insert(document) {
        const documentCopy = this.clone(document)

        documentCopy.id = this.generateId()

        this.collection.push(documentCopy)
    }

    findIndexById(id) {
        validateText(id, `${this.clazz.name} id`)

        return this.collection.findIndex(document => document.id === id)
    }

    findById(id) {
        validateText(id, `${this.clazz.name} id`)

        return this.collection.find(document => document.id === id) || null
    }

    update(document) {
        if (!(document instanceof this.clazz)) throw new TypeError(`document is not a ${this.clazz.name}`)

        const index = this.findIndexById(document.id)

        if (index < 0)
            throw new Error(`${this.clazz.name} not found`)

        this.collection[index] = this.clone(document)
    }
}

class Users extends Collection {
    constructor() {
        super(User, [])
    }

    findByEmail(email) {
        validateText(email, `${this.clazz.name} email`)

        return this.documents.find(document => document.email === email) || null
    }
}

class Posts extends Collection {
    constructor() {
        super(Post, [])
    }

    getAll() {
        return this.documents.map(this.clone.bind(this))
    }
}

class CreditCards extends Collection {
    constructor() {
        super(CreditCard, [])
    }
}