import { User, Post } from '../data/models.js'
import { validate, errors } from 'com'
const { SystemError, NotFoundError } = errors

function retrievePosts(userId) {
    validate.id(userId, 'user id')

    return User.findById(userId).lean() //el lean hace que nos devuelva el documento desconectado de la base de datos, antes nos devuelve un objeto complejo y ahora el objeto user sin más (esto sirve cuando solo queremos leer el objeto, ya que perdemos capacidad de salvarlo de nuevo)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Post.find().populate('author', 'name').select('-__v').lean() //populate(author) usa el vínculo que tiene Post con User (ver ref en models) para coger el usuario completo (y no solo el id como hace de base). Si pongo populate('author', 'name') me traerá solo name del user. Si pongo select('-X' no me traerá X)
                .catch(error => { throw new SystemError(error.message) })
                .then(posts => {
                    // callback(posts) si lo devolvieramos así, tendría demasiada mierda, hay que sanear los datos
                    posts.forEach(post => {
                        post.id = post._id.toString()
                        delete post._id

                        if (post.author._id) {
                            post.author.id = post.author._id.toString()
                            delete post.author._id
                        }

                        /* delete post.__v //una propiedad de los objetos de mongoose que no queremos */

                        post.likes = post.likes.map(userObjectId => userObjectId.toString()) //para que no aparezca el objectid

                        post.liked = post.likes.includes(userId) //si este user le ha dado like

                        post.fav = user.favs.some(postObjectId => postObjectId.toString() === post.id) // si este user le ha dado fav
                    })

                    return posts
                })
        })
}

export default retrievePosts