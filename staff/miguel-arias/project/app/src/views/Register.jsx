import { useContext } from '../hooks'

import { Container, Form, Link, Input, Button } from '../library'

import logic from '../logic'

function Register(props) {
    console.log('register')

    const context = useContext()

    const handleSubmit = async event => {
        event.preventDefault()

        const name = event.target.querySelector('#name-input').value
        const email = event.target.querySelector('#email-input').value
        const password = event.target.querySelector('#password-input').value

        try {
            await logic.registerHome(name, email, password)
            props.onSuccess()
            alert('user registered')
        } catch (error) {
            context.handleError(error)
        }
    }

    const handleLoginClick = (event) => {
        event.preventDefault()
        props.onLoginClick()
    }

    return <Container>
        <h1>Register</h1>
        <Form onSubmit={handleSubmit}>
            <Input id='name-input' type='name' placeholder='House name'>House name</Input>

            <Input id='email-input' type='email' placeholder='Email'>Email</Input>

            <Input id='password-input' type='Password' placeholder='password'>Password</Input>

            <Button type='submit'>Register</Button>
        </Form>
        <nav>
            <p>Already have an account?</p>
            <Link onClick={handleLoginClick}>Log in</Link>
        </nav>
    </Container>
}

export default Register