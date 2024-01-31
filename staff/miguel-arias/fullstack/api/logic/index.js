import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'
import retrieveUser from './retrieveUser.js'
import changeUserEmail from './changeUserEmail.js'
import changeUserPassword from './changeUserPassword.js'

import createPost from './createPost.js'
import deletePost from './deletePost.js'
import retrievePosts from './retrievePosts.js'
import retrieveFavPosts from './retrieveFavPosts.js'
import toggleFavPost from './toggleFavPost.js'
import toggleLikePost from './toggleLikePost.js'
import updatePostText from './updatePostText.js'
import commentPost from './commentPost.js'

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
    commentPost,
}

export default logic