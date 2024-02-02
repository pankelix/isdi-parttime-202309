import { useState } from 'react'
import Login from './views/Login'
import Register from './views/Register'
import Home from './views/Home'

import Context from './Context'

import { errors } from 'com'
const { ContentError, DuplicityError, NotFoundError } = errors
import Feedback from './components/Feedback'


function App() {
    console.log('App')

    const [view, setView] = useState('login')
    // [<current-state>, <setter-for-next-state>]
    const [level, setLevel] = useState(null)
    const [message, setMessage] = useState(null)

    const handleRegisterShow = () => {
        setView('register')
        setMessage(null)
        setLevel(null)
    }

    const handleLoginShow = () => {
        setView('login')
        setMessage(null)
        setLevel(null)
    }

    const handleHomeShow = () => {
        setView('home')
        setMessage(null)
        setLevel(null)
    }

    const handleError = error => {
        let level = 'fatal'

        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
            level = 'warn'
        else if (error instanceof DuplicityError || error instanceof NotFoundError)
            level = 'error'

        setLevel(level)
        console2.log(error.message, level)

        setMessage(error.message)
    }

    const handleFeedbackAccepted = () => {
        setMessage(null)
        setLevel(null)
    }

    return <>
        <Context.Provider value={{ handleError }}>
            {message && <Feedback level={level} message={message} onAccepted={handleFeedbackAccepted} />}
            {view === 'login' && <Login onRegisterClick={handleRegisterShow} onSuccess={handleHomeShow} />}
            {view === 'register' && <Register onLoginClick={handleLoginShow} onSuccess={handleLoginShow} />}
            {view === 'home' && <Home onLogoutClick={handleLoginShow} />}
        </Context.Provider>
    </>
}

export default App