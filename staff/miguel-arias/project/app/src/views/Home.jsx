import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import logic from '../logic'

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
    const [role, setRole] = useState(null)

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

    function activateAdmin() {
        setRole('admin')
    }

    function activateUser() {
        setRole('user')
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
                <Button onClick={handleHomeClick}>Home</Button>
                <Button onClick={handleTasksClick}>Tasks</Button>
                <Button onClick={handleStatsClick}>Stats</Button>
                <Button onClick={handleProfilesClick}>Profile</Button>
                <h1>Hello world, your home is {name}</h1>
                <Button>Filter</Button>
            </nav>
        </header>

        <Routes>
            <Route path='/' element={<Calendar loadTasks={logic.retrieveTasks} stamp={stamp} />} />
            <Route path='/profiles' element={<Profiles loadProfiles={logic.retrieveProfiles} stamp={stamp} onAdmin={activateAdmin} onUser={activateUser} role={role} />} />
            <Route path='/templates' element={<Templates loadTemplates={logic.retrieveTemplates} stamp={stamp} role={role}/>} />
        </Routes>
        <footer>
            <Button>
                ➕
            </Button>
        </footer >
    </>
}

export default Home