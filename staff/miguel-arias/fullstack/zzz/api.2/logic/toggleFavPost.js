const JSON = require ("../utils/JSON");
const { NotFoundError, SystemError } = require ("../utils/errors");
const { validateText, validateFunction } = require ("../utils/validators");

function toggleFavPost(userId, postId, callback) {
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

            const index = user.favs.indexOf(postId)

                if (index < 0)
                    user.favs.push(postId)
                else
                    user.favs.splice(index, 1)

            JSON.stringifyToFile('./data/users.json', users, error => {
                if (error) {
                    callback(new SystemError(error.message))

                    return
                }

                callback(null)
            })
        })
    })
}

module.export = toggleFavPost