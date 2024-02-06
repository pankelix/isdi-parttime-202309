import logic from "../logic"

import { useContext } from "../hooks"

import { Container, Form, Input, Button, Link } from "../library/index"

function Register(props) {
    console.log('Register')

    const context = useContext()

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
                    context.handleError(error)

                    return
                }

                props.onSuccess()
            })
        } catch (error) {
            context.handleError(error)
        }
    }

    function handleLoginClick(event) {
        event.preventDefault()

        // console.log('login click')
        props.onLoginClick()
    }

    return <Container>
        <article>
            <h1>Register</h1>

            <Form onSubmit={handleSubmit}>
                <Input id="name-input" placeholder="Name">Name</Input>

                <Input id="email-input" type="email" placeholder="Email">E-mail</Input>

                <Input id="password-input" type="password" placeholder="Password">Password</Input>

                <Button className="entrance-button" type="submit">Register</Button>

                <nav>
                    <p>Already have an account?</p>
                    <Link onClick={handleLoginClick}>Enter</Link>
                </nav>
            </Form>
        </article>
    </Container>
}

export default Register