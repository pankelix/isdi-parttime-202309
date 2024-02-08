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

        return (async () => {
            try {
                await logic.loginUser(email, password)
                props.onSuccess()
            } catch (error) {
                context.handleError(error)
            }
        })()
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

                <Button className="entrance-button" type="submit">Log In</Button>

                <nav>
                    <p>Don't have an account?</p>
                    <Link onClick={handleRegisterClick}>Sign up</Link>
                </nav>
            </Form>
        </article>
    </Container>
}

export default Login