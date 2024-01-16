const { Post, User } = require ("../data/models")
const { NotFoundError, SystemError } = require ("./errors")
const { validateFunction, validateId } = require ("./helpers/validators")

function toggleFavPost(postId, userId, callback) {
    validateId(postId, 'post id')
    validateId(userId, 'user id')
    validateFunction(callback, 'callback')

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

module.export = toggleFavPost