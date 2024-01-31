import { useState } from "react"
import Login from "./views/Login"
import Register from "./views/Register"
import Home from "./views/Home"
import { ContentError, DuplicityError, NotFoundError } from "./logic/errors"

function App() {
    console.log('App')

    const [view, setView] = useState('login')
    // [<current-state>, <setter-for-next-state>]
    const [type, setType] = useState(null)
    const [message, setMessage] = useState(null)

    function handleRegisterShow() {
        setView('register')
        setMessage(null)
        setType(null)
    }

    function handleLoginShow() {
        setView('login')
        setMessage(null)
        setType(null)
    }

    function handleHomeShow() {
        setView('home')
        setMessage(null)
        setType(null)
    }

    /*  function handleError(error) {
         if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
             console2.log(error.message, 'warn')
         else if (error instanceof DuplicityError || error instanceof NotFoundError)
             console2.log(error.message, 'error')
         else
             console2.log(error.message, 'fatal')
 
         alert(error.message)
     } */

    function handleError(error) {
        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
            setType('warn')
        else if (error instanceof DuplicityError || error instanceof NotFoundError)
            setType('error')
        else
            setType('fatal')

        setMessage(error.message)
    }

    return <>
        {message && <Feedback type={type} message={message} />}
        {view === 'login' && <Login onRegisterClick={handleRegisterShow} onSuccess={handleHomeShow} onError={handleError} />}
        {view === 'register' && <Register onLoginClick={handleLoginShow} onSuccess={handleLoginShow} onError={handleError} />}
        {view === 'home' && <Home onLogoutClick={handleLoginShow} onError={handleError} />}
    </>
}

export default App

function Feedback(props) {
    let color = 'yellowgreen'
    let backgroundColor = 'transparent'

    if (props.type === 'info')
        color = 'dodgerblue'
    else if (props.type === 'warn')
        color = 'gold'
    else if (props.type === 'error')
        color = 'tomato'
    else if (props.type === 'fatal') {
        color = 'white'
        backgroundColor = 'tomato'
    }

    return <p style={{ color, backgroundColor }}>{props.message}</p>
}