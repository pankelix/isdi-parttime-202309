import logic from "../logic"

import { Container, Form, Input, Button } from "../library/index"

function Profile(props) {
    console.log('profile')

    function handleChangeEmailSubmit(event) {
        event.preventDefault()

        const newEmail = event.target.querySelector('#new-email-input').value
        const newEmailConfirm = event.target.querySelector('#new-email-confirm-input').value
        const password = event.target.querySelector('#password-input').value

        try {
            logic.changeUserEmail(newEmail, newEmailConfirm, password, error => {
                if (error) {
                    alert(error.message)

                    return
                }
                props.onSuccess()
                
                alert('Email changed successfully')
            })
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
            logic.changeUserPassword(password, newPassword, newPasswordConfirm, error => {
                if (error) {
                    alert(error.message)

                    return
                }
                props.onSuccess()
                
                alert('Password changed successfully')
            })
        } catch (error) {
            alert(error.message)
        }
    }

    return <>
        <Container className="profile-view">
            <article>
                <h2>Update e-mail</h2>

                <Form onSubmit={handleChangeEmailSubmit}>
                    <Input id="new-email-input" type="email" placeholder="New Email">New e-mail</Input>

                    <Input id="new-email-confirm-input" type="email" placeholder="Confirm new Email">Confirm new e-mail</Input>

                    <Input id="password-input" type="password" placeholder="Password">Password</Input>

                    <Button type="submit">Update e-mail</Button>
                </Form>
            </article>

            <article>
                <h2>Update password</h2>

                <Form onSubmit={handleChangePasswordSubmit}>
                    <Input id="password-input" type="password" placeholder="Current Password">Current password</Input>

                    <Input id="new-password-input" type="password" placeholder="New Password">New password</Input>

                    <Input id="new-password-confirm-input" type="password" placeholder="Confirm new password">Confirm new password</Input>

                    <Button type="submit">Update password</Button>
                </Form>
            </article>
        </Container>
    </>
}

export default Profile