import { Post, User } from '../data/models.js'
import validate from './helpers/validate.js'
import { SystemError, NotFoundError } from './errors.js'

function createPost(userId, image, text) {
    validate.id(userId, 'user id')
    validate.text(image, 'image')
    validate.text(text)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Post.create({ author: userId, image, text })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })

}

export default createPost