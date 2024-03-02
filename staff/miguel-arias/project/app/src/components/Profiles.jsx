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
    const [view, setView] = useState(null)

    const refreshProfiles = async () => {
        try {
            const profiles = await logic.retrieveProfiles()
            setProfiles(profiles)
        } catch (error) {
            context.handleError(error)
        }
    }

    useEffect(() => {
        console.log('Profiles effect')

        refreshProfiles()
    }, [props.stamp])

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

    const handleEditProfileClick = () => {
        setView('edit-profile-view')
    }

    const handleManageProfilesClick = () => {
        setView('manage-profiles-view')
    }

    const handleManageProfileSubmit = async (event) => {
        event.preventDefault()
        const profileName = event.target.querySelector('Input[list="profiles"]').value
        const profile = profiles.find(profile => profile.name === profileName)
        const role = event.target.querySelector('Input[list="roles"]').value
        try {
            await logic.editRole(profile.id, role)
            refreshProfiles()
            setView(null)
        } catch (error) {
            context.handleError(error)
        }
    }

    return <Container>
        <h1>Profiles</h1>

        <Button>Filter</Button>

        {profiles.map(profile => <Profile onProfileClick={handleProfileClick} key={profile.id} profile={profile} />)}

        {pinCode === 'pinCode' && <Container>
            <Form onSubmit={handleSubmit}>
                <h3>{name}</h3>
                <p>Pin code</p>
                <Input id='digit1' placeholder='-'></Input>
                <Input id='digit2' placeholder='-'></Input>
                <Input id='digit3' placeholder='-'></Input>
                <Input id='digit4' placeholder='-'></Input>
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>}

        <Container>
            {role === 'admin' ? <Button onClick={handleManageProfilesClick}>Manage profiles</Button> : ''}
            {role !== null ? <Button onClick={handleEditProfileClick}>Edit your profile</Button> : ''}
        </Container>

        {view === 'edit-profile-view' && <Container>
            <Button>Change picture</Button>
            <Button>Change profile color</Button>
            <Button>Change pincode</Button>
            <Button>Delete profile</Button>
        </Container>}

        {view === 'manage-profiles-view' && <Container>
            <Form onSubmit={handleManageProfileSubmit}>
                <Input list='profiles'>Profile to change</Input>
                <datalist id='profiles'>
                    {profiles.map(profile => <option key={profile.id} value={profile.name} />)}
                </datalist>

                <Input list='roles'>New role</Input>
                <datalist id='roles'>
                    <option value='admin' />
                    <option value='user' />
                </datalist>

                <Button type='submit'>Accept</Button>

                <Button type='button'>Delete profile</Button>
            </Form>
        </Container>}

        <Container>
            <Button>
                ➕
            </Button>
        </Container>
    </Container>
}

export default Profiles