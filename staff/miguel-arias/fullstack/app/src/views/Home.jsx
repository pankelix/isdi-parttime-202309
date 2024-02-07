import { useState, useEffect } from "react"
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

import logic from "../logic"

import { useContext } from "../hooks"

import { Button, Link, } from "../library/index"
import { Profile, Posts, NewPost, UserPosts } from "../components/index"

function Home(props) {
    console.log('Home')

    const context = useContext()
    const navigate = useNavigate()
    const location = useLocation()

    const [view, setView] = useState(null)
    const [name, setName] = useState(null)
    const [stamp, setStamp] = useState(null)

    function handleLogoutClick() {
        try {
            logic.logoutUser()
            props.onLogoutClick()
        } catch (error) {
            context.handleError(error)
        }
    }

    useEffect(() => {
        console.log('Home -> effect (name)')
        try {
            logic.retrieveUser()
                .then(user => setName(user.name))
                .catch(error => context.handleError(error))
        } catch (error) {
            context.handleError(error)
        }
    }, []) //el array vacío al final sirve para que sólo se active la primera vez

    function handleProfileClick(event) {
        event.preventDefault()

        navigate('/profile')
    }

    function handleHomeClick(event) {
        event.preventDefault()

        window.scrollTo(0, 0)

        navigate('/')
    }

    function handleNewPostClick() {
        setView('new-post')
    }

    function handleNewPostCancel() {
        setView(null)
    }

    function handleChangeUserData() {
        navigate('/')
    }

    function handleNewPostPublish() {
        setStamp(Date.now())
        setView(null)

        window.scrollTo(0, 0)
    }

    function handleFavPostsClick(event) {
        event.preventDefault()

        navigate('/favs')
    }

    return <>
        <header>
            <h1><Link onClick={handleHomeClick}></Link></h1>

            <nav>
                <Link onClick={handleProfileClick}>{name}</Link>
                <Link onClick={handleFavPostsClick}>Your ⭐</Link>
                <Button className="logout-button" onClick={handleLogoutClick}>Logout</Button>
            </nav>
        </header>

        <Routes>
            <Route path='/profile' element={<Profile onSuccess={handleChangeUserData} />} />
            <Route path='/favs' element={<Posts loadPosts={logic.retrieveFavPosts} />} />
            <Route path='/users/:userId/posts' element={<UserPosts stamp={stamp} />} />
            <Route path='/' element={<Posts loadPosts={logic.retrievePosts} stamp={stamp} />} />
        </Routes>

        <footer>
            {view === 'new-post' && <NewPost onSuccess={handleNewPostPublish} onCancel={handleNewPostCancel} />}

            {view !== 'new-post' && location.pathname !== '/profile' && location.pathname !== '/favs' && <Button className="new-post-button" onClick={handleNewPostClick}>➕</Button>}
        </footer>
    </>
}

export default Home