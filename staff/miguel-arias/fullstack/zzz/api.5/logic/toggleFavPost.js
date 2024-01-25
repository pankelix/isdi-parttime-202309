import { Post, User } from '../data/models.js'
import validate from './helpers/validate.js'
import { NotFoundError, SystemError } from './errors.js'

function toggleFavPost(postId, userId) {
    validate.id(postId, 'post id')
    validate.id(userId, 'user id')

    return Post.findById(postId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(post => {
            if (!post)
                throw new NotFoundError('post not found')

            return User.findById(userId)
                .catch(error => { throw new SystemError(error.message) })
                .then(user => {
                    if (!user)
                        throw new NotFoundError('user not found')

                    const postIdIndex = user.favs.indexOf(postId)

                    if (postIdIndex < 0)
                        user.favs.push(postId)
                    else
                        user.favs.splice(postIdIndex, 1)

                    return user.save()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default toggleFavPost