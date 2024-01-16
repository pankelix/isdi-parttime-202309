const registerUser = require('./registerUser')
const authenticateUser = require('./authenticateUser')
const retrieveUser = require('./retrieveUser')
const changeUserEmail = require('./changeUserEmail')
const changeUserPassword = require('./changeUserPassword')

const createPost = require('./createPost')
const deletePost = require('./deletePost')
const retrievePosts = require('./retrievePosts')
const retrieveFavPosts = require('./retrieveFavPosts')
const toggleFavPost = require('./toggleFavPost')
const toggleLikePost = require('./toggleLikePost')
const updatePostText = require('./updatePostText')

const logic = {
    registerUser,
    authenticateUser,
    retrieveUser,
    changeUserEmail,
    changeUserPassword,
    createPost,
    deletePost,
    retrievePosts,
    retrieveFavPosts,
    toggleFavPost,
    toggleLikePost,
    updatePostText,
}

module.exports = logic