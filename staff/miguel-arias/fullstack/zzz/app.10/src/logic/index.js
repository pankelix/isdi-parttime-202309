import registerUser from './registerUser'
import loginUser from './loginUser'
import logoutUser from './logoutUser'
import retrieveUser from './retrieveUser'
import changeUserEmail from './changeUserEmail'
import changeUserPassword from './changeUserPassword'
import isUserLoggedIn from './isUserLoggedIn'

import publishPost from './publishPost'
import deletePost from './deletePost'
import retrievePosts from './retrievePosts'
import retrieveFavPosts from './retrieveFavPosts'
import toggleFavPost from './toggleFavPost'
import toggleLikePost from './toggleLikePost'
import toggleEditPost from './toggleEditPost'
import updatePostText from './updatePostText'
import commentPost from './commentPost'
import retrieveUserPosts from './retrieveUserPosts'

const logic = {
    registerUser,
    loginUser,
    logoutUser,
    retrieveUser,
    changeUserEmail,
    changeUserPassword,
    isUserLoggedIn,

    publishPost,
    deletePost,
    retrievePosts,
    retrieveFavPosts,
    toggleFavPost,
    toggleLikePost,
    toggleEditPost,
    updatePostText,
    commentPost,
    retrieveUserPosts
}

export default logic