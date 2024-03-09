import { useEffect, useState } from 'react'
import { useContext } from '../hooks'
import { Button, Container, Input, Form } from '../library'

import session from '../logic/session'
import logic from '../logic'

function Stats(props) {
    const context = useContext()

    const [profiles, setProfiles] = useState([])
    const [profile, setProfile] = useState(null)
    const [view, setView] = useState(null)

    const refreshProfiles = async () => {
        try {
            const profiles = await logic.retrieveProfiles()
            setProfiles(profiles)
        } catch (error) {
            context.handleError(error)
        }
    }

    const handleRedeemPointsClick = (profileId) => {
        setProfile(profileId)
        setView('redeem-points-view')
    }

    const handleRedeemPointsSubmit = async (event) => {
        event.preventDefault()
        const points = Number(event.target.points.value)
        try {
            await logic.redeemPoints(profile, points)
            refreshProfiles()
            setView(null)
        } catch (error) {
            context.handleError(error)
        }
    }

    const handleCancelClick = () => {
        setView(null)
    }

    useEffect(() => {
        console.log('Stats effect')

        refreshProfiles()
    }, [props.stamp])

    return <Container>
        <h1>Statistics</h1>

        {profiles.map(profile => <Container key={profile.id}>
            <p>{profile.name} {profile.points ? profile.points : '0'}</p>

            {session.profileRole === 'admin' && profile.points !== 0 && <Button onClick={() => handleRedeemPointsClick(profile.id)}>Redeem points</Button>}
        </Container>)}

        {view === 'redeem-points-view' && <Container>
            <Form onSubmit={handleRedeemPointsSubmit}>
                <Input id='points' type='number' placeholder={'Points to redeem'} required={true}></Input>
                <Button type='submit'>Redeem!</Button>
                <Button type='button' onClick={handleCancelClick}>Cancel</Button>
            </Form>
        </Container>}
    </Container>
}

export default Stats