import logic from "../logic"

import { Container, Form, Field, Button, Link } from "../library/index"

function Login(props) {
    console.log('Login')

    function handleSubmit(event) {
        event.preventDefault()

        const emailInput = event.target.querySelector('#email-input')
        const passwordInput = event.target.querySelector('#password-input')

        const email = emailInput.value
        const password = passwordInput.value

        // console.log(email, password)
        try {
            logic.loginUser(email, password, error => {
                if (error) {
                    alert(error.message)

                    return
                }

                props.onSuccess()
            })

        } catch (error) {
            alert(error.message)
        }
    }

    function handleRegisterClick(event) {
        event.preventDefault()

        // console.log('register click')
        props.onRegisterClick()
    }

    return <Container>
        <div className="login-view">
            <h1>Login</h1>

            <Form onSubmit={handleSubmit}>
                <Field id="email-input" type="email">E-mail</Field>

                <Field id="password-input" type="password">Password</Field>

                <Button type="submit">Log In</Button>
            </Form>

            <div className="login-to-register">
                <p>Don't have an account?</p>
                <Link onClick={handleRegisterClick}>Sign up</Link>
            </div>
        </div>
    </Container>
}

export default Login