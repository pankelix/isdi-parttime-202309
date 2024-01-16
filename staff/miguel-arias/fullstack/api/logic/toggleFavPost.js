const { Post, User } = require("../data/models")
const validate = require("./helpers/validate")
const { NotFoundError, SystemError } = require("./errors")

function toggleFavPost(postId, userId, callback) {
    validate.id(postId, 'post id')
    validate.id(userId, 'user id')
    validate.function(callback, 'callback')

    Post.findById(postId)
        .then(post => {
            if (!post) {
                callback(new NotFoundError('post not found'))

                return
            }

            User.findById(userId)
                .then(user => {
                    if (!user) {
                        callback(new NotFoundError('user not found'))

                        return
                    }

                    const postIdIndex = user.favs.indexOf(postId)

                    if (postIdIndex < 0)
                        user.favs.push(postId)
                    else
                        user.favs.splice(postIdIndex, 1)

                    user.save()
                        .then(() => callback(null))
                        .catch(error => callback(new SystemError(error.message)))
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

module.exports = toggleFavPost