class HomeView {
    constructor() {
        this.container = document.getElementById('home-view')

        this.container.style.display = 'none'

        this.logoutButton = this.container.querySelector('#logout-button')

        this.logoutButton.onclick = function () {
            this.container.style.display = 'none'
            this.profileView.style.display = 'none'
            this.newPostView.style.display = 'none'
            this.postsView.style.display = ''
            loginView.container.style.display = ''

            logic.logoutUser()
        }.bind(this)

        this.changeEmailForm = this.container.querySelector('#change-email-form')

        this.changeEmailForm.onsubmit = function (event) {
            event.preventDefault()

            const newEmailInput = this.changeEmailForm.querySelector('#new-email-input')
            const newEmailConfirmInput = this.changeEmailForm.querySelector('#new-email-confirm-input')
            const passwordInput = this.changeEmailForm.querySelector('#password-input')

            const newEmail = newEmailInput.value
            const newEmailConfirm = newEmailConfirmInput.value
            const password = passwordInput.value

            try {
                logic.changeUserEmail(newEmail, newEmailConfirm, password)

                alert('E-mail changed')

                this.changeEmailForm.reset()
            } catch (error) {
                alert(error.message)
            }
        }.bind(this)

        this.changePasswordForm = this.container.querySelector('#change-password-form')

        this.changePasswordForm.onsubmit = function (event) {
            event.preventDefault()

            const passwordInput = this.changePasswordForm.querySelector('#password-input')
            const newPasswordInput = this.changePasswordForm.querySelector('#new-password-input')
            const newPasswordConfirmInput = this.changePasswordForm.querySelector('#new-password-confirm-input')

            const password = passwordInput.value
            const newPassword = newPasswordInput.value
            const newPasswordConfirm = newPasswordConfirmInput.value

            try {
                logic.changeUserPassword(newPassword, newPasswordConfirm, password)

                alert('Password changed')

                this.changePasswordForm.reset()
            } catch (error) {
                alert(error.message)
            }
        }.bind(this)

        this.homeLink = this.container.querySelector('#home-link')

        this.homeLink.onclick = function (event) {
            event.preventDefault()

            this.profileView.style.display = 'none'
            this.newPostView.style.display = 'none'
            this.postsView.style.display = ''
        }.bind(this)

        // profile

        this.profileView = this.container.querySelector('#profile-view')

        this.profileView.style.display = 'none'

        this.profileLink = this.container.querySelector('#profile-link')

        this.profileLink.onclick = function (event) {
            event.preventDefault()

            this.newPostView.style.display = 'none'
            this.postsView.style.display = 'none'
            this.profileView.style.display = ''
        }.bind(this)

        this.postsView = this.container.querySelector('#posts-view')

        this.newPostView = this.container.querySelector('#new-post-view')
        this.newPostView.style.display = 'none'

        this.newPostButton = this.container.querySelector('#new-post-button')

        this.newPostButton.onclick = function () {
            this.profileView.style.display = 'none'
            this.postsView.style.display = ''
            this.newPostView.style.display = ''
        }.bind(this)

        this.newPostForm = this.newPostView.querySelector('#new-post-form')

        this.cancelNewPostButton = this.newPostForm.querySelector('#cancel-new-post-button')

        this.cancelNewPostButton.onclick = function (event) {
            event.preventDefault()

            this.newPostView.style.display = 'none'
            this.newPostForm.reset()
        }.bind(this)

        this.newPostForm.onsubmit = function (event) {
            event.preventDefault()

            const imageInput = this.newPostForm.querySelector('#image-input')
            const textInput = this.newPostForm.querySelector('#text-input')

            const image = imageInput.value
            const text = textInput.value

            try {
                logic.publishPost(image, text)

                this.newPostForm.reset()

                this.newPostView.style.display = 'none'

                // re-render posts

                this.renderPosts()
            } catch (error) {
                alert(error.message)
            }
        }.bind(this)
    }

    renderPosts() {
        this.postsView.innerHTML = ''

        try {
            const posts = logic.retrievePosts()

            posts.forEachReverse(function (post) {
                const article = document.createElement('article')
                article.setAttribute('class', 'post')

                const h2 = document.createElement('h2')
                h2.innerText = post.author

                const img = document.createElement('img')
                img.setAttribute('class', 'post-image')
                img.src = post.image

                const p = document.createElement('p')
                p.innerText = post.text

                article.append(h2, img, p)

                this.postsView.append(article)
            }.bind(this))
        } catch (error) {
            alert(error.message)
        }
    }
}