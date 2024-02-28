import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import logic from '../logic'

import Context from '../Context'

import { useContext } from '../hooks'

import { Button, Container } from '../library'
import { Calendar, Profiles, Templates } from '../components'
/* import { Button, Container } from '../library' */

function Home(props) {

    const context = useContext()
    const navigate = useNavigate()

    const [name, setName] = useState(null)
    const [stamp, setStamp] = useState(null)
    const [view, setView] = useState(null)

    function handleLogoutClick() {
        logic.logoutHome(error => {
            if (error) {
                context.handleError(error)

                return
            }
        })

        props.onLogoutClick()
    }

    function handleHomeClick() {
        navigate('/')
    }

    function handleProfilesClick() {
        navigate('/profiles')
    }

    function handleTasksClick() {
        navigate('/templates')
    }

    function handleStatsClick() {
        navigate('/stats')
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
            <h1>Hello world, your home is {name}</h1>
        </header>

        <Routes>
            <Route path='/' element={<Calendar loadTasks={logic.retrieveTasks} loadTemplates={logic.retrieveTemplates} stamp={stamp} role={props.role} />} />
            <Route path='/profiles' element={<Profiles loadProfiles={logic.retrieveProfiles} stamp={stamp} role={props.role} />} />
            <Route path='/templates' element={<Templates loadTemplates={logic.retrieveTemplates} stamp={stamp} role={props.role} />} />
        </Routes>
        <footer>
            <nav>
                <Button onClick={handleLogoutClick}>Logout</Button>
                <Button onClick={handleHomeClick}>Home</Button>
                <Button onClick={handleTasksClick}>Tasks</Button>
                <Button onClick={handleStatsClick}>Stats</Button>
                <Button onClick={handleProfilesClick}>Profile</Button>
            </nav>
        </footer >
    </>
}

export default Home