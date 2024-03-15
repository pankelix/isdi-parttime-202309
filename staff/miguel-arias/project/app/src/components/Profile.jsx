import { useState } from 'react'
import { Button, Container } from '../library'
import session from '../logic/session'

function Profile(props) {
    const profile = props.profile

    const handleProfileClick = (profileName) => {
        props.onProfileClick(profileName)
    }

    return <Container className='flex flex-col items-center'>
        <ul><li><Button style={{ backgroundColor: profile.id === session.profileId ? profile.color.code : '' }} onClick={handleProfileClick} className='modal-border-button my-[1rem] max-h-[15rem] overflow-y-auto'>{profile.name}</Button></li></ul>
    </Container>
}

export default Profile