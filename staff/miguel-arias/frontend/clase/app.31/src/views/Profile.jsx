import logic from "../logic"

import { Container, Form, Field, Button } from "../library/index"

function Profile() {
    console.log('profile')

    function handleChangeEmailSubmit(event) {
        event.preventDefault()

        const newEmail = event.target.querySelector('#new-email-input').value
        const newEmailConfirm = event.target.querySelector('#new-email-confirm-input').value
        const password = event.target.querySelector('#password-input').value

        try {
            logic.changeUserEmail(newEmail, newEmailConfirm, password)

            alert('Email changed successfully')

            setView(null)
        } catch (error) {
            alert(error.message)
        }
    }

    function handleChangePasswordSubmit(event) {
        event.preventDefault()

        const password = event.target.querySelector('#password-input').value
        const newPassword = event.target.querySelector('#new-password-input').value
        const newPasswordConfirm = event.target.querySelector('#new-password-confirm-input').value

        try {
            logic.changeUserPassword(password, newPassword, newPasswordConfirm)

            alert('Password changed successfully')

            setView(null)
        } catch (error) {
            alert(error.message)
        }
    }

    return <>
        <Container>
            <h2>Update e-mail</h2>

            <Form onSubmit={handleChangeEmailSubmit}>
                <Field htmlFor="new-email-input" type="email">New e-mail</Field>

                <Field htmlFor="new-email-confirm-input" type="email">Confirm new e-mail</Field>

                <Field htmlFor="password-input" type="password">Password</Field>

                <Button type="submit">Update e-mail</Button>
            </Form>

            <h2>Update password</h2>

            <Form onSubmit={handleChangePasswordSubmit}>
                <Field htmlFor="password-input" type="password">Current password</Field>

                <Field htmlFor="new-password-input" type="password">New password</Field>

                <Field htmlFor="new-password-confirm-input" type="password">Confirm new password</Field>

                <Button type="submit">Update password</Button>
            </Form>
        </Container>
    </>
}

export default Profile