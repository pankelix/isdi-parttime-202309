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
            logic.loginUser(email, password)

            props.onSuccess()
        } catch (error) {
            alert(error.message)
        }
    }

    function handleRegisterClick(event) {
        event.preventDefault()

        // console.log('register click')
        props.onRegisterClick()
    }

    return <div className="view">
        <h1>Login</h1>

        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="email-input">E-mail</label>
            <input id="email-input" type="email" />

            <label htmlFor="password-input">Password</label>
            <input type="password" id="password-input" />

            <button type="submit">Login</button>
        </form>

        <a href="" onClick={handleRegisterClick}>Register</a>
    </div>
}