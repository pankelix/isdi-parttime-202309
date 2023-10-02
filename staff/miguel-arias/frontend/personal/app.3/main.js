// register

var registerView = document.getElementById('register')

registerView.style.display = 'none'

var registerLoginLink = registerView.querySelector('a')

registerLoginLink.onclick = function (event) {
    event.preventDefault()

    registerView.style.display = 'none'
    loginView.style.display = 'block'
}

var registerForm = registerView.querySelector('form')

registerForm.onsubmit = function (event) {
    event.preventDefault()

    var nameInput = registerForm.querySelector('#name')
    var emailInput = registerForm.querySelector('#email')
    var passwordInput = registerForm.querySelector('#password')

    var name = nameInput.value
    var email = emailInput.value
    var password = passwordInput.value

    try {
        registerUser(name, email, password)

        nameInput.value = ''
        emailInput.value = ''
        passwordInput.value = ''

        registerView.style.display = 'none'
        loginView.style.display = 'block'
    } catch (error) {
        alert(error.message)
    }
}

// login

var loginView = document.getElementById('login')
var loginRegisterLink = loginView.querySelector('a')

loginRegisterLink.onclick = function (event) {
    event.preventDefault()

    loginView.style.display = 'none'
    registerView.style.display = 'block'
}

var loginForm = loginView.querySelector('form')

loginForm.onsubmit = function (event) {
    event.preventDefault()

    var emailInput = loginForm.querySelector('#email')
    var passwordInput = loginForm.querySelector('#password')

    var email = emailInput.value
    var password = passwordInput.value

    try {
        authenticateUser(email, password)

        emailInput.value = ''
        passwordInput.value = ''

        var homeTitle = homeView.querySelector('h1')

        var user = retrieveUser(email)

        loginUser(email)

        homeTitle.innerText = 'Hello, ' + user.name + '!'

        loginView.style.display = 'none'
        homeView.style.display = 'block'
    } catch (error) {
        alert(error.message)
    }
}

// home

var homeView = document.getElementById('home')
homeView.style.display = 'none'

var logoutButton = document.getElementById('logout-btn')

logoutButton.onclick = function (event) {
    logOutUser()
    homeView.style.display = 'none'
    loginView.style.display = 'block'
}

var homeProfileLink = homeView.querySelector('a')

homeProfileLink.onclick = function (event) {
    event.preventDefault()

    homeView.style.display = 'none'
    profileView.style.display = 'block'

    var profileName = document.getElementById('profile-name')
    var profileEmail = document.getElementById('profile-email')

    var user = userLogged[0]

    profileName.innerText = 'Your name: ' + user.name
    profileEmail.innerText = 'Your email: ' + user.email
}

//profile

var profileView = document.getElementById('profile')
profileView.style.display = 'none'

var homeButton = document.getElementById('home-btn')

homeButton.onclick = function (event) {
    event.preventDefault()
    profileView.style.display = 'none'
    homeView.style.display = 'block'
}

//cambiar name
var profileForm = profileView.querySelector('form')

var changeNameButton = document.getElementById('change-name-btn')

changeNameButton.onclick = function (event) {
    event.preventDefault()

    var nameInput = profileForm.querySelector('#name')
    var name = nameInput.value

    var user = retrieveUser(userLogged[0].email)

    changeName(user, name)

    nameInput.value = ''
}

//cambiar email
var profileForm = profileView.querySelector('form')

var changeEmailButton = document.getElementById('change-email-btn')

changeEmailButton.onclick = function (event) {
    event.preventDefault()

    var emailInput = profileForm.querySelector('#email')
    var email = emailInput.value

    var user = retrieveUser(userLogged[0].email)

    changeEmail(user, email)

    emailInput.value = ''
}

//cambiar contraseña
var profileForm = profileView.querySelector('form')

var changePasswordButton = document.getElementById('change-password-btn')

changePasswordButton.onclick = function (event) {
    event.preventDefault()

    var user = retrieveUser(userLogged[0].email)

    changePassword(user)
}

