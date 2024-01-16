const { Post, User } = require ('../data/models')
const { SystemError, NotFoundError } = require ('./errors')

const { validateText, validateFunction, validateId } = require ('./helpers/validators')

function createPost(userId, image, text, callback) {
    validateId(userId, 'user id')
    validateText(image, 'image')
    validateText(text, 'text')
    validateFunction(callback, 'callback')

    User.findById(userId).lean()
        .then(user => {
            if (!user) {
                callback(new NotFoundError('user not found'))

                return
            }

            Post.create({ author: userId, image, text })
                .then(() => callback(null))
                .catch(error => callback(new SystemError(error.message)))

        })
        .catch(error => callback(new SystemError(error.message)))

}

module.export = createPost