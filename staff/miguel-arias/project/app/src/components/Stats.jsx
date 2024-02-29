import { useEffect, useState } from 'react'
import { useContext } from '../hooks'
import { Button, Container } from '../library'

import logic from '../logic'

function Stats(props) {
    const context = useContext()

    const [profiles, setProfiles] = useState([])

    const refreshProfiles = async () => {
        try {
            const profiles = await logic.retrieveProfiles()
            console.log(profiles)
            setProfiles(profiles)
        } catch (error) {
            context.handleError(error)
        }
    }

    useEffect(() => {
        console.log('Profiles effect')

        refreshProfiles()
    }, [props.stamp])

    return <Container>
        <h1>Statistics</h1>

        {profiles.map(profile => <Container> <p>{profile.name} {profile.points ? profile.points : '0'}</p> {profile.points &&<Button>Redeem points</Button>}</Container>)}

        {/* user, puntos y botón de redeem points */}

    </Container>
}

export default Stats