import logic from "../logic"

import { useContext } from "../hooks"

import { Container, Form, Input, Button, Link } from "../library/index"

function Login(props) {
    console.log('Login')

    const context = useContext()

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
                    context.handleError(error)

                    return
                }

                props.onSuccess()
                // setTimeout(() => props.onSuccess(), 2000)
            })

        } catch (error) {
            context.handleError(error)
        }
    }

    function handleRegisterClick(event) {
        event.preventDefault()

        // console.log('register click')
        props.onRegisterClick()
    }

    return <Container>
        <article>
            <h1>Login</h1>

            <Form onSubmit={handleSubmit}>
                <Input id="email-input" type="email" placeholder="Email">E-mail</Input>

                <Input id="password-input" type="password" placeholder="Password">Password</Input>

                <Button type="submit">Log In</Button>

                <nav>
                    <p>Don't have an account?</p>
                    <Link onClick={handleRegisterClick}>Sign up</Link>
                </nav>
            </Form>
        </article>
    </Container>
}

export default Login