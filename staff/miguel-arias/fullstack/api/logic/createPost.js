import { Post, User } from '../data/models.js'
import validate from './helpers/validate.js'
import { SystemError, NotFoundError } from './errors.js'

function createPost(userId, image, text, callback) {
    validate.id(userId, 'user id')
    validate.text(image, 'image')
    validate.text(text)
    validate.function(callback, 'callback')

    User.findById(userId).lean()
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))

                return
            }

            Post.create({ author: userId, image, text })
                .then(() => callback(null))
                .catch(error => callback(new SystemError(error.message)))

        })
        .catch(error => callback(new SystemError(error.message)))

}

export default createPost