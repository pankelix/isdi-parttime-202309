const { validateText, validateFunction } = require('./helpers/validators')

function createPost(userId, image, text, callback) {
    validateText(userId, 'user id')
    validateText(image, 'image')
    validateText(text, 'text')
    validateFunction(callback, 'callback')

    //TODO use models
}

module.exports = createPost