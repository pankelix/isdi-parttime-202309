// DONE

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
            else
                copy[key] = document[key]
        }
        return copy
    }

    insert(document) {
        const documentCopy = this.clone(document)

        documentCopy.id = generateId()

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

        if (index < 0) throw new Error(`${this.clazz.name} not found`)

        this.collection[index] = this.clone(document)
    }
}

// TEST

var db2 = {}

db2.users = new Collection(User, db.users)

var user = new User(null, 'Ada Love', 'ada@love.com', '123123123')
db2.users.insert(user)

db2.posts = new Collection(Post, db.posts)

var post = new Post(null, db2.users.collection[db2.users.collection.length - 1].id, 'https://image.com', 'hola mundo', [])
db2.posts.insert(post)