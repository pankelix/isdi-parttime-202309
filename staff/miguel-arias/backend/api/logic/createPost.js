const { Post } = require('../data/models')
const { SystemError } = require('./errors')

const { validateText, validateFunction, validateId } = require('./helpers/validators')

function createPost(userId, image, text, callback) {
    validateId(userId, 'user id')
    validateText(image, 'image')
    validateText(text, 'text')
    validateFunction(callback, 'callback')

    Post.create({ author: userId, image, text })
        .then(() => callback(null))
        .catch(error => callback(new SystemError(error.message)))
}

module.exports = createPost