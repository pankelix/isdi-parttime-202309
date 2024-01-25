import { Post, User } from '../data/models.js'
import validate from './helpers/validate.js'
import { SystemError, NotFoundError } from './errors.js'

function deletePost(userId, postId, callback) {
    validate.id(userId, 'user id')
    validate.id(postId, 'post id')
    validate.function(callback, 'callback')

    User.findById(userId).lean()
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))

                return
            }

            Post.findByIdAndDelete(postId)
                .then(post => {
                    if (!post) {
                        callback(new NotFoundError('post not found'))
                    }

                    callback(null)
                })
                .catch(error => callback(new SystemError(error.message)))

        })
        .catch(error => callback(new SystemError(error.message)))
}

export default deletePost