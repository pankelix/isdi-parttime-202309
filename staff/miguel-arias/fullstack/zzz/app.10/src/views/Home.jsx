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
        logic.logoutUser(error => {
            if (error) {
                context.handleError(error)

                return
            }
        })

        props.onLogoutClick()
    }

    useEffect(() => {
        console.log('Home -> effect (name)')

        try {
            logic.retrieveUser((error, user) => {
                if (error) {
                    context.handleError(error)

                    return
                }
                setName(user.name)
            })

        } catch (error) {
            alert(error.message)
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
            <h1><Link className="header-text" onClick={handleHomeClick}></Link></h1>

            <nav>
                <Link onClick={handleProfileClick}>{name}</Link>
                <Link onClick={handleFavPostsClick}>Your ⭐</Link>
                <Button className="logout-button" onClick={handleLogoutClick}>Logout</Button>
            </nav>
        </header>

        <Routes>
            <Route path='/profile' element={<Profile onSuccess={handleChangeUserData} />}/>
            <Route path='/favs' element={<Posts loadPosts={logic.retrieveFavPosts} />} />
            <Route path='/users/:userId' element={<UserPosts loadPosts={logic.retrieveUserPosts} stamp={stamp}/>} />
            <Route path='/' element={<Posts loadPosts={logic.retrievePosts} stamp={stamp} />} />
        </Routes>

        <footer>
            {view === 'new-post' && <NewPost onSuccess={handleNewPostPublish} onCancel={handleNewPostCancel} />}

            {view !== 'new-post' && location.pathname !== '/profile' && location.pathname !== '/favs' && <Button className="new-post-button" onClick={handleNewPostClick}>➕</Button>}
        </footer>
    </>
}

export default Home