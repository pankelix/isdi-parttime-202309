function App() {
    const viewState = React.useState('login')

    const view = viewState[0]
    const setView = viewState[1]
    // setView('register')
    // setView('login')

    function handleRegisterShow() {
        setView('register')
    }

    function handleLoginShow() {
        setView('login')
    }

    function handleHomeShow() {
        setView('home')
    }

    return <>
        {view === 'login' && <Login onRegisterClick={handleRegisterShow} onSuccess={handleHomeShow} />}
        {view === 'register' && <Register onLoginClick={handleLoginShow} onSuccess={handleLoginShow} />}
        {view === 'home' && <Home />}
    </>
}