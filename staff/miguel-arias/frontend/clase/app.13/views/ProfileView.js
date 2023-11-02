class ProfileView extends Component {
    constructor() {
        super(document.getElementById('profile-view'))

        this.hide()

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
    }
}