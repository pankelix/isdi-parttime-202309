import { errors, validate } from 'com'
const { SystemError, NotFoundError } = errors

import { Post, User } from '../data/models.js'

function commentPost(userId, postId, commentText) {
    validate.id(userId, 'user id')
    validate.id(postId, 'post id')
    validate.text(commentText, 'comment text')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('User not found')

            const userName = user.name

            return Post.findById(postId)
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post)
                        throw new NotFoundError('Post not found')

                    const comment = {
                        author: userId,
                        name: userName,
                        text: commentText
                    }

                    post.comments.push(comment)

                    return post.save()
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
}

export default commentPost