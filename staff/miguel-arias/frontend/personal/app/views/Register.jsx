function Register(props) {
    function handleSubmit(event) {
        event.preventDefault

        const name = event.target.querySelector('#name-input').value
        const email = event.target.querySelector('#email-input').value
        const password = event.target.querySelector('#password-input').value

        try {
            logic.registerUser(name, email, password)

            props.onSuccess()
        } catch (error) {
            alert(error.message)
        }
    }

    function handleLoginClick(event) {
        event.preventDefault()

        props.onLoginClick()
    }

    return <div className="view">
        <h1>Register</h1>

        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="name-input">Name</label>
            <input type="text" id="name-input" />

            <label htmlFor="email-input">Email</label>
            <input type="email" id="email-input" />

            <label htmlFor="password-input">Password</label>
            <input type="password" id="password-input" />

            <button type="submit">Register</button>
        </form>

        <a href="" onClick={handleLoginClick}>Login</a>
    </div>
}