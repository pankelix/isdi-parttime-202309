class LoginView {
    constructor(containerId) {
        this.container = document.getElementById(containerId)

        this.loginRegisterLink = this.container.querySelector('a')

        this.loginRegisterLink.onclick = function (event) {
            event.preventDefault()

            this.container.style.display = 'none'
            this.loginForm.reset()

            registerView.style.display = ''
        }.bind(this)

        this.loginForm = this.container.querySelector('form')

        this.loginForm.onsubmit = function (event) {
            event.preventDefault()

            const emailInput = this.loginForm.querySelector('#email-input')
            const passwordInput = this.loginForm.querySelector('#password-input')

            const email = emailInput.value
            const password = passwordInput.value

            try {
                logic.loginUser(email, password)

                this.loginForm.reset()

                const user = logic.retrieveUser()

                profileLink.innerText = user.name

                this.container.style.display = 'none'

                // render posts in home

                renderPosts()

                // show home

                homeView.style.display = ''
            } catch (error) {
                alert(error.message)
            }
        }.bind(this)
    }
}