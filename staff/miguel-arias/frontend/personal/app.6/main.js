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

//change name
var profileForm = profileView.querySelector('form')

var changeNameButton = document.getElementById('change-name-btn')

changeNameButton.onclick = function (event) {
    event.preventDefault()

    var nameInput = profileForm.querySelector('#name')
    var name = nameInput.value

    var user = retrieveUser(userLogged[0].email)

    try {
        nameInput.value = ''
        changeName(user, name)

    } catch (error) {
        alert (error.message)
    }
}

//change email
var profileForm = profileView.querySelector('form')

var changeEmailButton = document.getElementById('change-email-btn')

changeEmailButton.onclick = function (event) {
    event.preventDefault()

    var newEmailInput = profileForm.querySelector('#new-email')
    var newEmail = newEmailInput.value

    var newEmailConfirmInput = profileForm.querySelector('#new-email-confirm')
    var newEmailConfirm = newEmailConfirmInput.value

    var passwordInput = profileForm.querySelector('#password')
    var password = passwordInput.value

    var user = retrieveUser(userLogged[0].email)

    try {
        newEmailInput.value = ''
        changeEmail(user, newEmail, newEmailConfirm, password)

    } catch (error) {
        alert (error.message)
    }


}

//change password
var profileForm = profileView.querySelector('form')

var changePasswordButton = document.getElementById('change-password-btn')

changePasswordButton.onclick = function (event) {
    event.preventDefault()

    var passwordInput = profileForm.querySelector('#password')
    var password = passwordInput.value
    var confirmPasswordInput = profileForm.querySelector('#confirm-password')
    var confirmPassword = confirmPasswordInput.value

   var user = retrieveUser(userLogged[0].email)

    try {
        passwordInput.value = ''
        confirmPasswordInput.value = ''
        changeUserPassword(user.email, password, confirmPassword)
        alert('Password has been changed')
    } catch (error) {
        alert(error.message)
    }
}