loginView = document.getElementById('login-view')

// loginView.style.display = 'none'

loginRegisterLink = loginView.querySelector('a')

loginRegisterLink.onclick = function (event) {
    event.preventDefault()

    loginView.style.display = 'none'
    loginForm.reset()

    registerView.style.display = ''
}

loginForm = loginView.querySelector('form')

loginForm.onsubmit = function (event) {
    event.preventDefault()

    var emailInput = loginForm.querySelector('#email-input')
    var passwordInput = loginForm.querySelector('#password-input')

    var email = emailInput.value
    var password = passwordInput.value

    try {
        authenticateUser(email, password)

        loginForm.reset()

        var user = retrieveUser(email)

        profileLink.innerText = user.name

        loggedInEmail = email

        loginView.style.display = 'none'

        // render posts in home

       renderPosts()

        // show home

        homeView.style.display = ''
    } catch (error) {
        alert(error.message)
    }
}