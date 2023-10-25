registerView = document.getElementById('register-view')

registerView.style.display = 'none'

registerLoginLink = registerView.querySelector('a')

registerLoginLink.onclick = function (event) {
    event.preventDefault()

    registerView.style.display = 'none'
    registerForm.reset()

    loginView.container.style.display = ''
}

registerForm = registerView.querySelector('form')

registerForm.onsubmit = function (event) {
    event.preventDefault()

    const nameInput = registerForm.querySelector('#name-input')
    const emailInput = registerForm.querySelector('#email-input')
    const passwordInput = registerForm.querySelector('#password-input')

    const name = nameInput.value
    const email = emailInput.value
    const password = passwordInput.value

    try {
        logic.registerUser(name, email, password)

        registerForm.reset()

        registerView.style.display = 'none'
        loginView.container.style.display = ''
    } catch (error) {
        alert(error.message)
    }
}