const mongodb = require('mongodb')

const { MongoClient, ObjectId } = mongodb

const client = new MongoClient('mongodb://127.0.0.1:27017')

client.connect()
    .then(connector => {
        const db = connector.db('test')

        const users = db.collection('users')
        const posts = db.collection('posts')

        /* users.insertOne({ name: 'Mr Smee', email: 'mr@smee.com', password: '123123123', favs: [] })
            .then(result => console.log('user inserted', result))
            .catch(error => console.error(error)) */

        /* users.updateOne({ _id: new ObjectId('658c8c97f6003847c78e539a') }, { $set: { email: 'mr@smee2.com' } })
            .then(result => console.log('user updated', result))
            .catch(error => console.error(error)) */

        /* users.findOne({ _id: new ObjectId('658c8c97f6003847c78e539a') })
            .then(result => console.log('found', result))
            .catch(error => console.error(error)) */

        /* users.deleteOne({ _id: new ObjectId('658c8c97f6003847c78e539a') })
            .then(result => console.log('deleted', result))
            .catch(error => console.error(error)) */

        /* users.find().toArray()
            .then(result => console.log('found all', result))
            .catch(error => console.error(error)) */

        /* posts.insertOne({ author: new ObjectId('658956f7eed889536efe91d7'), image: 'http://image.com/peter', text: 'hey delilah!', likes: [] })
            .then(result => console.log('post inserted', result))
            .catch(error => console.error(error)) */

        /* posts.find({ author: new ObjectId('658956f7eed889536efe91d7') }).toArray()
            .then(result => console.log('post found', result))
            .catch(error => console.error(error)) */
    })
    .catch(error => console.error(error))