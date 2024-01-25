import { Post, User } from '../data/models.js'
import validate from './helpers/validate.js'
import { NotFoundError, SystemError } from './errors.js'

function toggleLikePost(userId, postId) {
    validate.id(userId, 'user id')
    validate.id(postId, 'post id')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Post.findById(postId)
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post)
                        throw new NotFoundError('post not found')

                    const userIdIndex = post.likes.indexOf(userId)

                    if (userIdIndex < 0)
                        post.likes.push(userId)
                    else
                        post.likes.splice(userIdIndex, 1)

                    return post.save()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default toggleLikePost