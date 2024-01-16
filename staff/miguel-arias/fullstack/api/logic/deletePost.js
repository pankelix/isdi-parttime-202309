const { Post, User } = require('../data/models')
const validate = require("./helpers/validate")
const { SystemError, NotFoundError } = require('./errors')

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

module.exports = deletePost