import { Post, User } from '../data/models.js'
import validate from './helpers/validate.js'
import { SystemError, NotFoundError } from './errors.js'

function deletePost(userId, postId) {
    validate.id(userId, 'user id')
    validate.id(postId, 'post id')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            //solo si soy el autor del post
            return Post.findByIdAndDelete(postId)
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post)
                        throw new NotFoundError('post not found')
                })

        })
}

export default deletePost