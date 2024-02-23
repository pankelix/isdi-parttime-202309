import logic from '../logic'

import { Container, Form, Input, Button, Link } from '../library'
import { useContext } from '../hooks'

function Login(props) {
    console.log('login')

    const context = useContext()

    const handleSubmit = async event => {
        event.preventDefault()

        const email = event.target.querySelector('#email-input').value
        const password = event.target.querySelector('#password-input').value

        try {
            await logic.loginHome(email, password)
            props.onSuccess()
        } catch (error) {
            context.handleError(error)
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