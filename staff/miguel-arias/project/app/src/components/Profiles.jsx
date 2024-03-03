import { Profile } from '../components'
import { Container, Form, Input, Button } from '../library'
import { useEffect, useState } from 'react'
import { useContext } from '../hooks'
import defaultColors from 'com/defaultColors'

import logic from '../logic'

function Profiles(props) {
    const role = props.role

    const context = useContext()
    const colors = defaultColors

    const [profiles, setProfiles] = useState([])
    const [activeProfileId, setActiveProfileId] = useState(null)
    const [pinCode, setPinCode] = useState(null)
    const [name, setName] = useState(null)
    const [palette, setPalette] = useState([])
    const [chosenColor, setChosenColor] = useState(null)
    const [usedColors, setUsedColors] = useState([])
    const [view, setView] = useState(null)

    const refreshProfiles = async () => {
        try {
            const profiles = await logic.retrieveProfiles()
            profiles.forEach(profile => {
                let newColor = profile.color.code
                setUsedColors(oldColors => [...oldColors, newColor])
            })
            setProfiles(profiles)
        } catch (error) {
            context.handleError(error)
        }
    }

    useEffect(() => {
        console.log('Profiles effect')

        refreshColors()
        refreshProfiles()
    }, [props.stamp])

    const refreshColors = async () => {
        try {
            setPalette(colors)
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
        const digit1 = event.target.digit1.value
        const digit2 = event.target.digit2.value
        const digit3 = event.target.digit3.value
        const digit4 = event.target.digit4.value

        const pincode = digit1 + digit2 + digit3 + digit4

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

        const role = event.target.querySelector('Input[list="roles"]').value
        try {
            await logic.editRole(activeProfileId, role)
            refreshProfiles()
            context.handleRole(role)
            setView(null)
        } catch (error) {
            context.handleError(error)
        }
    }

    const handleOnProfileClick = (profileId) => {
        setActiveProfileId(profileId)
    }

    const handleDeleteProfileClick = async () => {
        try {
            await logic.deleteProfile(activeProfileId)
            refreshProfiles()
            setView(null)
        } catch (error) {
            context.handleError(error)
        }
    }

    const handleNewProfileClick = () => {
        setView('new-profile-view')
    }

    const handleNewProfileSubmit = async (event) => {
        event.preventDefault()
        const name = event.target.name.value

        const newDigit1 = event.target.newDigit1.value
        const newDigit2 = event.target.newDigit2.value
        const newDigit3 = event.target.newDigit3.value
        const newDigit4 = event.target.newDigit4.value

        const pincode = newDigit1 + newDigit2 + newDigit3 + newDigit4

        try {
            await logic.registerProfile(name, pincode)
            refreshProfiles()
            setView(null)
        } catch (error) {
            context.handleError(error)
        }
    }

    const handleCancelClick = () => {
        setView('null')
    }

    const handleChangeColorClick = () => {
        setView('change-color-view')
    }

    const handleColorClick = (color) => {
        setChosenColor(color)
    }

    const handleChooseColorClick = async () => {
        try {
            await logic.changeProfileColor(chosenColor)
            refreshProfiles()
            setChosenColor(null)
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
            <Button onClick={handleChangeColorClick}>Change profile color</Button>
            <Button>Change pincode</Button>
            <Button>Delete profile</Button>
        </Container>}

        {view === 'change-color-view' && <Container>
            {palette.map(color => !usedColors.includes(color.code) ? <Button key={color.code} onClick={() => handleColorClick(color)} style={{ backgroundColor: chosenColor === color ? 'white' : color.code }}>{color.name}</Button> : '')}
            <Button onClick={handleChooseColorClick}>Choose color</Button>
            <Button onClick={handleCancelClick}>Cancel</Button>
        </Container>}

        {view === 'manage-profiles-view' && <Container>
            {<Form onSubmit={handleManageProfileSubmit}>
                {profiles.map(profile => <Button key={profile.id} type='button' style={{ backgroundColor: activeProfileId === profile.id ? 'red' : '' }} onClick={() => handleOnProfileClick(profile.id)}>{profile.name}</Button>)}

                <Input list='roles'>New role</Input>
                <datalist id='roles'>
                    <option value='admin' />
                    <option value='user' />
                </datalist>

                <Button type='submit'>Accept</Button>

                <Button type='button' onClick={handleDeleteProfileClick}>Delete profile</Button>
            </Form>}
        </Container>}

        <Container>
            <Button onClick={handleNewProfileClick}>
                ➕
            </Button>
        </Container>

        {view === 'new-profile-view' && <Container>
            <Form onSubmit={handleNewProfileSubmit}>
                <Input id='name' type='text' placeholder='Name'></Input>
                <p>Pin code</p>
                <Input id='newDigit1' placeholder='-'></Input>
                <Input id='newDigit2' placeholder='-'></Input>
                <Input id='newDigit3' placeholder='-'></Input>
                <Input id='newDigit4' placeholder='-'></Input>
                <Button type='submit'>Submit</Button>
                <Button type='button' onClick={handleCancelClick}>Cancel</Button>
            </Form>
        </Container>}
    </Container>
}

export default Profiles