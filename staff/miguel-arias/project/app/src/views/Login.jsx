import logic from '../logic'

import { Container, Form, Input, Button, Link } from '../library'

function Login(props) {
    console.log('login')

    const handleSubmit = async event => {
        event.preventDefault()

        const email = event.target.querySelector('#email-input').value
        const password = event.target.querySelector('#password-input').value

        try {
            await logic.loginHome(email, password)
            props.onSuccess()
        } catch (error) {
            alert(error)
        }
    }

    const handleRegisterClick = (event) => {
        event.preventDefault()
        props.onRegisterClick()
    }

    return <Container>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit}>
            <Input id='email-input' type='email' placeholder='Email'>Email</Input>

            <Input id='password-input' type='password' placeholder='Password'>Password</Input>

            <Button type='submit'>Log In</Button>
        </Form>

        <nav>
            <p>Don't have an account?</p>
            <Link onClick={handleRegisterClick}>Sign up</Link>
        </nav>
    </Container>
}

export default Login