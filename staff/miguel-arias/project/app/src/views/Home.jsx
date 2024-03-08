import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import session from '../logic/session'
import logic from '../logic'

import { useContext } from '../hooks'

import { Button } from '../library'
import { Calendar, Profiles, Templates, Stats, Rooms } from '../components'

function Home(props) {

    const context = useContext()
    const navigate = useNavigate()

    const [homeName, setHomeName] = useState(null)
    const [profileName, setProfileName] = useState(null)
    const [stamp, setStamp] = useState(null)

    function handleLogoutClick() {
        try {
            logic.logoutHome()
            context.handleRole(null)
            props.onLogoutClick()
        } catch (error) {
            context.handleError(error)
        }
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

    function handleRoomsClick() {
        navigate('/rooms')
    }

    useEffect(() => {
        (async () => {
            try {
                const home = await logic.retrieveHome()
                setHomeName(home.name)
            } catch (error) {
                context.handleError(error)
            }
            try {
                const profiles = await logic.retrieveProfiles()
                const profile = profiles.find(profile => session.profileId === profile.id)
                if (profile)
                    setProfileName(profile.name)
            } catch (error) {

            }
        })()
    }, [session.profileId])

    return <>
        <header>
            <h1>Hello world, your home is {homeName}</h1>
        </header>

        <Routes>
            <Route path='/' element={<Calendar stamp={stamp} role={props.role} />} />
            <Route path='/profiles' element={<Profiles stamp={stamp} role={props.role} />} />
            <Route path='/templates' element={<Templates stamp={stamp} role={props.role} />} />
            {<Route path='/stats' element={<Stats stamp={stamp} role={props.role} />} />}
            {<Route path='/rooms' element={<Rooms stamp={stamp} role={props.role} />} />}
        </Routes>

        <footer>
            <nav>
                <Button onClick={handleLogoutClick}>Logout</Button>
                <Button onClick={handleHomeClick}>Home</Button>
                {session.profileRole !== null && <Button onClick={handleTasksClick}>Templates</Button>}
                {session.profileRole !== null && <Button onClick={handleStatsClick}>Stats</Button>}
                {session.profileRole !== null && <Button onClick={handleRoomsClick}>Rooms</Button>}
                <Button onClick={handleProfilesClick}>{session.profileId ? profileName : 'Profile'}</Button>
            </nav>
        </footer >
    </>
}

export default Home