const mongoose = require ('mongoose')

const { User, Post } = require ('./models')

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        /* const pepito = new User({ name: 'Pepito Grillo', email: 'pepito@grillo.com', password: '123123123' })

        pepito.save()
            .then(() => console.log('saved'))
            .catch(error => console.error(error)) */

        /* const pepitoPost = new Post({ author: '658df1c9b905ae15a35876fd', image: 'https://image.com/image', text: 'soy un textarrrdo' })

        pepitoPost.save()
            .then(() => console.log('posted'))
            .catch(error => console.error(error)) */

        /* Post.findById('658df9e3b41b2869eb6a83b9')
            .then(post => {
                post.likes.push('658df9e3b41b2869eb6a83b9'),

                post.save()
                    .then(() => console.log('post liked'))
                    .catch(error => console.error(error))
            }) */

        /* User.findById('658956fbeed889536efe91d8')
            .then(user => {
                user.favs.push('658956fbeed889536efe91d8')

                user.save()
                    .then(() => console.log('post saved'))
                    .catch(error => console.error(error))
            }) */
    })
    .catch(error => console.error(error))