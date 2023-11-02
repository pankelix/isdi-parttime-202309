class Logic {
    constructor() {
        this.loggedInEmail = null
    }

    registerUser(name, email, password) {
        validateText(name, 'name')
        validateText(email, 'email')
        validateText(password, 'password')

        const user = findUserByEmail(email)

        if (user)
            throw new Error('user already exists')

        createUser(name, email, password)
    }

    loginUser(email, password) {
        validateText(email, 'email')
        validateText(password, 'password')

        const user = findUserByEmail(email)

        if (!user || user.password !== password)
            throw new Error('wrong credentials')

        this.loggedInEmail = email
    }

    logoutUser() {
        this.loggedInEmail = null
    }

    retrieveUser() {
        const user = findUserByEmail(this.loggedInEmail)

        if (!user)
            throw new Error('user not found')

        return user
    }

    changeUserEmail(newEmail, newEmailConfirm, password) {
        validateText(newEmail, 'new email')
        validateText(newEmailConfirm, 'new email confirm')
        validateText(password, 'password')

        const user = findUserByEmail(this.loggedInEmail)

        if (!user || user.password !== password)
            throw new Error('wrong credentials')

        if (newEmail !== newEmailConfirm)
            throw new Error('new email and its confirmation do not match')

        modifyUserEmail(this.loggedInEmail, newEmail)

        this.loggedInEmail = newEmail
    }

    changeUserPassword(newPassword, newPasswordConfirm, password) {
        validateText(newPassword, 'new password')
        validateText(newPasswordConfirm, 'new password confirm')
        validateText(password, 'password')

        const user = findUserByEmail(this.loggedInEmail)

        if (!user || user.password !== password)
            throw new Error('wrong credentials')

        if (newPassword !== newPasswordConfirm)
            throw new Error('new password and its confirmation do not match')

        modifyUserPassword(this.loggedInEmail, newPassword)
    }

    retrievePosts() {
        const user = findUserByEmail(this.loggedInEmail)

        if (!user)
            throw new Error('user not found')

        return getPosts()
    }

    publishPost(image, text) {
        validateText(image, 'image')
        validateText(text, 'text')

        createPost(this.loggedInEmail, image, text)
    }

    toggleLikePost(postIndex) {
        validateNumber(postIndex)

        const post = findPostByIndex(postIndex)

        const likeIndex = post.likes.indexOf(this.loggedInEmail)

        if (likeIndex < 0)
            post.likes.push(this.loggedInEmail)
        else
            post.likes.splice(likeIndex, 1)

        updatePost(postIndex, post)
    }
}