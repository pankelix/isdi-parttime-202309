const { validateFunction, validateId } = require('./helpers/validators')

const { Post } = require('../data/models')
const { SystemError, NotFoundError } = require('./errors')

function retrievePost(postId, callback) {
    validateId(postId, 'post id')
    validateFunction(callback, 'callback')

    Post.findById(postId)
        .then(post => {
            if (!post) {
                callback(new NotFoundError('post not found'))

                return
            }

            callback(null, { author: post.author, image: post.image, text: post.text, likes: post.likes })
        })
        .catch(error => callback(new SystemError(error.message)))
}

module.exports = retrievePost