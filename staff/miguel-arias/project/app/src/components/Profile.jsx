import { useState } from 'react'
import { Button } from '../library'
import session from '../logic/session'

function Profile(props) {
    const profile = props.profile

    const handleProfileClick = (profileName) => {
        props.onProfileClick(profileName)
    }

    return <article>
        <ul><li><Button style={{ backgroundColor: profile.id === session.profileId ? profile.color : '' }} onClick={handleProfileClick}>{profile.name}</Button></li></ul>
    </article>
}

export default Profile