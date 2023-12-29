const { NotFoundError, SystemError } = require("./errors");
const { validateText, validateFunction } = require("./helpers/validators");

function toggleLikePost(userId, postId, callback) {
    validateText(userId, 'user id')
    validateText(postId, 'post id')
    validateFunction(callback, 'callback')

    //TODO add models
}

module.exports = toggleLikePost