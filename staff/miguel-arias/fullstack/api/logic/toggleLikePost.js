import { Post, User } from '../data/models.js'
import validate from './helpers/validate.js'
import { NotFoundError, SystemError } from './errors.js'

function toggleLikePost(userId, postId, callback) {
    validate.id(userId, 'user id')
    validate.id(postId, 'post id')
    validate.function(callback, 'callback')

    User.findById(userId).lean()
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))

                return
            }

            Post.findById(postId)
                .then(post => {
                    if (!post) {
                        callback(new NotFoundError('post not found'))

                        return
                    }

                    const userIdIndex = post.likes.indexOf(userId)

                    if (userIdIndex < 0)
                        post.likes.push(userId)
                    else
                        post.likes.splice(userIdIndex, 1)

                    post.save()
                        .then(() => callback(null))
                        .catch(error => callback(new SystemError(error.message)))
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}


export default toggleLikePost