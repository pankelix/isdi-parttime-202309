import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import logic from '../logic'

import { useContext } from '../hooks'

import { Button } from '../library'
import { Calendar } from '../components'
/* import { Button, Container } from '../library' */

function Home(props) {

    const context = useContext()

    const [name, setName] = useState(null)
    const [stamp, setStamp] = useState(null)

    function handleLogoutClick() {
        logic.logoutHome(error => {
            if (error) {
                context.handleError(error)

                return
            }
        })

        props.onLogoutClick()
    }

    useEffect(() => {
        (async () => {
            try {
                const home = await logic.retrieveHome()

                setName(home.name)
            } catch (error) {
                context.handleError(error)
            }
        })()
    }, [])

    return <>
        <header>
            <nav>
                <Button onClick={handleLogoutClick}>Logout</Button>
                <h1>Hello world, your home is {name}</h1>
            </nav>
        </header>

        <Routes>
            <Route path='/' element={<Calendar loadTasks={logic.retrieveTasks} stamp={stamp} />} />
            <Route path='/profiles' /* element={<Profiles />} */ />
        </Routes>
    </>
}

export default Home