import logic from "../logic"

import { Container, Form, Field, Button, Link} from "../library/index"

function Register(props) {
    console.log('Register')

    function handleSubmit(event) {
        event.preventDefault()

        const nameInput = event.target.querySelector('#name-input')
        const emailInput = event.target.querySelector('#email-input')
        const passwordInput = event.target.querySelector('#password-input')

        const name = nameInput.value
        const email = emailInput.value
        const password = passwordInput.value

        // console.log(name, email, password)

        try {
            logic.registerUser(name, email, password, error => {
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

    function handleLoginClick(event) {
        event.preventDefault()

        // console.log('login click')
        props.onLoginClick()
    }

    return <Container>
        <div className="register-view">
            <h1>Register</h1>

            <Form onSubmit={handleSubmit}>
                <Field id="name-input">Name</Field>

                <Field id="email-input" type="email">E-mail</Field>

                <Field id="password-input" type="password">Password</Field>

                <Button type="submit">Register</Button>
            </Form>

            <div className="register-to-login">
                <p>Already have an account?</p>
                <Link onClick={handleLoginClick}>Enter</Link>
            </div>
        </div>
    </Container>
}

export default Register