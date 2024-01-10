const { Post, User } = require('../data/models')
const { NotFoundError, SystemError } = require("./errors");
const { validateId, validateFunction } = require("./helpers/validators");

function toggleLikePost(userId, postId, callback) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateFunction(callback, 'callback')

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


module.exports = toggleLikePost