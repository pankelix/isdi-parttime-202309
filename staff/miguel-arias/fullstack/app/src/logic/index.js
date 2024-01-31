import registerUser from './registerUser'
import loginUser from './loginUser'
import logoutUser from './logoutUser'
import retrieveUser from './retrieveUser'
import changeUserEmail from './changeUserEmail'
import changeUserPassword from './changeUserPassword'

import publishPost from './publishPost'
import deletePost from './deletePost'
import retrievePosts from './retrievePosts'
import retrieveFavPosts from './retrieveFavPosts'
import toggleFavPost from './toggleFavPost'
import toggleLikePost from './toggleLikePost'
import toggleEditPost from './toggleEditPost'
import updatePostText from './updatePostText'
import commentPost from './commentPost'

const logic = {
    registerUser,
    loginUser,
    logoutUser,
    retrieveUser,
    changeUserEmail,
    changeUserPassword,

    publishPost,
    deletePost,
    retrievePosts,
    retrieveFavPosts,
    toggleFavPost,
    toggleLikePost,
    toggleEditPost,
    updatePostText,
    commentPost,
}

export default logic