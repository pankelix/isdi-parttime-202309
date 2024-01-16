import { User, Post } from '../data/models.js'
import validate from './helpers/validate.js'
import { SystemError, NotFoundError } from './errors.js'

function retrievePosts(userId, callback) {
    validate.id(userId, 'user id')
    validate.function(callback, 'callback')

    User.findById(userId).lean() //el lean hace que nos devuelva el documento desconectado de la base de datos, antes nos devuelve un objeto complejo y ahora el objeto user sin más (esto sirve cuando solo queremos leer el objeto, ya que perdemos capacidad de salvarlo de nuevo)
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))

                return
            }

            Post.find().populate('author', 'name').lean() //populate(author) usa el vínculo que tiene Post con User (ver ref en models) para coger el usuario completo (y no solo el id como hace de base). Si pongo populate('author', 'name') me traerá solo name del user
                .then(posts => {
                    // callback(posts) si lo devolvieramos así, tendría demasiada mierda, hay que sanear los datos
                    posts.forEach(post => {
                        post.id = post._id.toString()
                        delete post._id

                        if (post.author._id) {
                            post.author.id = post.author._id.toString()
                            delete post.author._id
                        }

                        delete post.__v //una propiedad de los objetos de mongoose que no queremos

                        post.likes = post.likes.map(userObjectId => userObjectId.toString()) //para que no aparezca el objectid

                        post.liked = post.likes.includes(userId) //si este user le ha dado like

                        post.fav = user.favs.some(postObjectId => postObjectId.toString() === post.id) // si este user le ha dado fav
                    })

                    callback(null, posts)
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default retrievePosts