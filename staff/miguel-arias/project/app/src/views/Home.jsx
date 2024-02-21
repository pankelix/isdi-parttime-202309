import logic from '../logic'

import { useState, useEffect } from 'react'
/* import { Button, Container } from '../library' */

function Home(props) {

    const [name, setName] = useState(null)

    function handleLogoutClick() {
        logic.logoutUser(error => {
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
                alert(error)
            }
        })()
    }, [])

    return <>
        <header>
            <h1>Hello world, your home is {name}</h1>
        </header>
        <Routes>
            <Route path='/profiles' element={<Profiles />} />
        </Routes>
    </>
}

export default Home