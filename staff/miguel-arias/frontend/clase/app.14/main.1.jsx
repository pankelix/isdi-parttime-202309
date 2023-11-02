// logic

const logic = new Logic

// react

const root = ReactDOM.createRoot(document.getElementById('root'))

const loginView = <div id="login-view" className="view">
    <h1>Login 123</h1>

    <form className="form">
        <label for="email-input">E-mail</label>
        <input id="email-input" type="email" />

        <label for="password-input">Password</label>
        <input type="password" id="password-input" />

        <button type="submit">Login</button>
    </form>

    <a href="">Register</a>
</div>

root.render(loginView)