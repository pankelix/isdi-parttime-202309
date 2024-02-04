import { Post, User } from "../data/models.js"
import { validate, errors } from 'com'
const { SystemError, NotFoundError } = errors

function retrieveUserPosts(userId) {
    validate.id(userId, 'user id')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            const userId = user._id.toString()

            return Post.find().populate('author', 'name').select('-__v').lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(posts => {
                    const filteredPosts = posts.filter(post => post.author._id.toString() === userId)

                    filteredPosts.forEach(post => {
                        post.id = post._id.toString()
                        delete post._id

                        if (post.author._id) {
                            post.author.id = post.author._id.toString()
                            delete post.author._id
                        }

                        post.likes = post.likes.map(userObjectId => userObjectId.toString())

                        post.liked = post.likes.includes(userId)

                        post.fav = user.favs.some(postObjectId => postObjectId.toString() === post.id)
                    })

                    return filteredPosts
                })
        })
}

export default retrieveUserPosts