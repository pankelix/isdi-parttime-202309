var homeView = document.getElementById('home-view')

homeView.style.display = 'none'

var logoutButton = homeView.querySelector('#logout-button')

logoutButton.onclick = function () {
    homeView.style.display = 'none'
    profileView.style.display = 'none'
    loginView.style.display = ''
}

var changeEmailForm = homeView.querySelector('#change-email-form')

changeEmailForm.onsubmit = function (event) {
    event.preventDefault()

    var newEmailInput = changeEmailForm.querySelector('#new-email-input')
    var newEmailConfirmInput = changeEmailForm.querySelector('#new-email-confirm-input')
    var passwordInput = changeEmailForm.querySelector('#password-input')

    var newEmail = newEmailInput.value
    var newEmailConfirm = newEmailConfirmInput.value
    var password = passwordInput.value

    try {
        changeUserEmail(emailLoggedIn, newEmail, newEmailConfirm, password)

        emailLoggedIn = newEmail

        alert('E-mail changed')

        newEmailInput.value = ''
        newEmailConfirmInput.value = ''
        passwordInput.value = ''
    } catch (error) {
        alert(error.message)
    }
}

var changePasswordForm = homeView.querySelector('#change-password-form')

changePasswordForm.onsubmit = function (event) {
    event.preventDefault()

    var passwordInput = changePasswordForm.querySelector('#password-input')
    var newPasswordInput = changePasswordForm.querySelector('#new-password-input')
    var newPasswordConfirmInput = changePasswordForm.querySelector('#new-password-confirm-input')

    var password = passwordInput.value
    var newPassword = newPasswordInput.value
    var newPasswordConfirm = newPasswordConfirmInput.value

    try {
        changeUserPassword(emailLoggedIn, newPassword, newPasswordConfirm, password)

        alert('Password changed')

        passwordInput.value = ''
        newPasswordInput.value = ''
        newPasswordConfirmInput.value = ''
    } catch (error) {
        alert(error.message)
    }
}

var homeLink = homeView.querySelector('#home-link')

homeLink.onclick = function (event) {
    event.preventDefault()

    profileView.style.display = 'none'
}

// profile

var profileView = homeView.querySelector('#profile-view')

profileView.style.display = 'none'

var profileLink = homeView.querySelector('#profile-link')

profileLink.onclick = function (event) {
    event.preventDefault()

    profileView.style.display = ''
}