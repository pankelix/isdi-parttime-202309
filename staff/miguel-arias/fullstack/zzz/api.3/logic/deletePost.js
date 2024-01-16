const { Post, User } = require('../data/models')
const { SystemError, NotFoundError } = require('./errors')
const { validateId, validateFunction } = require('./helpers/validators')

function deletePost(userId, postId, callback) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateFunction(callback, 'callback')

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

module.exports = deletePost