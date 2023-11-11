/*
TODO collection abstraction

class Collection {
    constructor() {}

    create() {}

    clone() {}

    findIndexById() {}

    findById() {}

    update() {}
}

class UserCollection extends Collection {
    findByEmail() {}
    clone() {}
}

class PostCollection extends Collection {
    getAll() {}

    clone() {}
}

db.users = new UserCollection([...])
db.posts = new PostCollection([...])

db.users.findById(...)
db.users.findByEmail(...)
*/

//WIP first steps

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

    create(document) {
        const documentCopy = this.clone(document)

        documentCopy.id = generateId()

        this.collection.push(documentCopy)
    }
}

// TEST

var users = new Collection(User, db.users)

var user = new User(null, 'Ada Love', 'ada@love.com', '123123123')
users.create(user)

var posts = new Collection(Post, db.posts)

var post = new Post(null, users.collection[users.collection.length - 1].id, 'https://image.com', 'hola mundo', [])
posts.create(post)