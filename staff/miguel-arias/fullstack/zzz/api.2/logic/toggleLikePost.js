const JSON = require("../utils/JSON");
const { NotFoundError, SystemError } = require("../utils/errors");
const { validateText, validateFunction } = require("../utils/validators");

function toggleLikePost(userId, postId, callback) {
    validateText(userId, 'user id')
    validateText(postId, 'post id')
    validateFunction(callback, 'callback')

    JSON.parseFromFile('./data/users.json', (error, users) => {
        if (error) {
            callback(new SystemError(error.message))

            return
        }

        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new NotFoundError('user not found'))

            return
        }

        JSON.parseFromFile('./data/posts.json', (error, posts) => {
            if (error) {
                callback(new SystemError(error.message))

                return
            }

            const postIndex = posts.findIndex(post => post.id === postId)

            if (postIndex < 0) {
                callback(new NotFoundError('post not found'))

                return
            }

            const post = posts[postIndex]

            const userIdIndex = post.likes.indexOf(userId)

            if (userIdIndex < 0)
                post.likes.push(userId)
            else
                post.likes.splice(userIdIndex, 1)

            JSON.stringifyToFile('./data/posts.json', posts, error => {
                if (error) {
                    callback(new SystemError(error.message))

                    return
                }

                callback(null)
            })
        })
    })
}

module.exports = toggleLikePost