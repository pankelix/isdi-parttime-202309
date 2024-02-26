import { Profile } from '../components'
import { Container, Form, Input, Button } from '../library'
import { useEffect, useState } from 'react'
import { useContext } from '../hooks'

import logic from '../logic'

function Profiles(props) {
    const role = props.role

    const context = useContext()

    const [profiles, setProfiles] = useState([])
    const [pinCode, setPinCode] = useState(null)
    const [name, setName] = useState(null)

    const refreshProfiles = async () => {
        try {
            const profiles = await logic.retrieveProfiles()
            console.log(profiles)
            setProfiles(profiles)
        } catch (error) {
            context.handleError(error)
        }
    }

    const handleProfileClick = async (profileName) => {
        let name = profileName.target.firstChild.data
        try {
            setName(name)
            setPinCode('pinCode')
        } catch (error) {
            context.handleError(error)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let digit1 = event.target.digit1.value
        let digit2 = event.target.digit2.value
        let digit3 = event.target.digit3.value
        let digit4 = event.target.digit4.value

        let pincode = digit1 + digit2 + digit3 + digit4

        return (async () => {
            try {
                await logic.loginProfile(name, pincode)
                setPinCode(null)
                const role = await logic.retrieveRole()
                if (role === 'admin')
                    context.handleRole('admin')
                else
                    context.handleRole('user')
            } catch (error) {
                context.handleError(error)
            }
        })()
    }

    useEffect(() => {
        console.log('Profiles effect')

        refreshProfiles()
    }, [props.stamp])

    return <Container>
        <h1>Profiles</h1>

        <Button>Filter</Button>

        {profiles.map(profile => <Profile onProfileClick={handleProfileClick} key={profile._id} profile={profile} />)}

        {pinCode === 'pinCode' && <Container>
            <Form onSubmit={handleSubmit}>
                <Input id='digit1' placeholder='-'></Input>
                <Input id='digit2' placeholder='-'></Input>
                <Input id='digit3' placeholder='-'></Input>
                <Input id='digit4' placeholder='-'></Input>
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>}

        <Container>
            {role === 'admin' ? <Button>Manage profiles</Button> : ''}
            {role !== null ? <Button>Edit your profile</Button> : ''}
        </Container>

        <Container>
            <Button>
                ➕
            </Button>
        </Container>
    </Container>
}

export default Profiles