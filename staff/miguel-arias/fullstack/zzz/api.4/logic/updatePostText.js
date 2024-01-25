import { Post, User } from '../data/models.js'
import validate from './helpers/validate.js'
import { SystemError, NotFoundError } from './errors.js'


function updatePostText(userId, postId, text, callback) {
    validate.id(userId, 'user id')
    validate.id(postId, 'post id')
    validate.text(text)
    validate.function(callback, 'callback')

    User.findById(userId)
        .then(user => {
            if (!user) {
                callback(new NotFoundError('User not found'));
                return;
            }

            Post.findById(postId)
                .then(post => {
                    if (!post) {
                        callback(new NotFoundError('Post not found'));
                        return;
                    }

                    post.text = text
                    post.save()

                    callback(null);

                })
                .catch(error => callback(new SystemError(error.message)));
        })
        .catch(error => callback(new SystemError(error.message)));
}

export default updatePostText;